---
title: "CUDA-Accelerated Tensor Computation with Rust"
description: "Development log of my library, tensoron, and the MNIST classifier built on top of it."
published: true
post: true
date: '2025-05-07'
slug: 'tensoron'
tags: ['ml', 'math']
---

I wanted to try to make an MNIST classifier from scratch in Rust---a good low-level project to learn about ML basics and the operation of neural networks under the hood. This is something I've experimented with before in Haskell, but with moderate success.

I had recently purchased a 4060 Ti for machine learning purposes, so I decided that this time I would give myself very ambitious performance requirements for the project. This naturally meant that everything should be running on the GPU. Since I was writing this from scratch, I also did not want to use pre-made ML libraries so I could make my own abstractions instead.

I started looking for a sufficiently capable library that could also run operations on the GPU through CUDA---and to my surprise, one did not exist.$^{[1]}$ Obviously the natural next step was to write one myself.

I had three approaches for building my own library:
1. Use the entire `Rust-CUDA` toolkit to write kernels in Rust;
2. Write kernels in C and interact with the compiled PTX with Rust, or
3. Just write everything in CUDA C/C++.

Rust was the trivial choice. However, I now had to choose between options 1 and 2. The problem was that I barely knew how to write CUDA kernels. I had only made extremely basic kernels in the past, so I realized that maybe I can teach myself some CUDA C/C++ and kernel optimization on the way. This would match perfectly with my ambitious performance goals. So option 2 it was.

## Writing a Tensor Computation Library

Say we have a regular addition kernel:

```c showLineNumbers
extern "C" __global__ void add(float* m1, float* m2, int n) {
	int idx = blockIdx.x * blockDim.x + threadIdx.x;

	if(idx < n) {
		m1[idx] = m1[idx] + m2[idx];
	}
}
```

We compile it to PTX, and access its functions in Rust in the following manner:

``` rust showLineNumbers
// ...initialize CUDA context, construct a stream...

// Load PTX code from files
let ptx = CString::new(load_file("code.ptx"))?;
let module = Module::from_ptx_cstr(&ptx, &[])?;

// Allocate buffers for operands
let m1 = DeviceBuffer::from_slice(/* data allocated on host */)?;
let m2 = DeviceBuffer::from_slice(/* data allocated on host */)?;

unsafe {
    launch!(module.add<<<grid_size, block_size, 0, stream>>>(
        m1.as_device_ptr(),
        m2.as_device_ptr(),
        n,
    ))
    .unwrap()
}
```

That is a very handy API. We can now start constructing abstractions.

### The Tensor Type

I wanted to try some newer Rust tricks when constructing an API, and const generics were something that happened to pop into my mind. I wanted to keep the API relatively simple and export only a few as-generalized-as-possible types, and const generics seemed very good for this.

We define a generic `Tensor<T, const R: usize>`, where `T` is the data type, and `R` denotes the rank of the tensor:
```rust showLineNumbers
struct Tensor<T, const R: usize> {
    device_ptr: Option<DeviceBuffer<T>>,
    inner: Option<Vec<T>>,
    shape: [usize; R],
}
```

This is very handy, because we can treat different types as a special case of tensors; matrices are simply defined as `Tensor<T, 2>`, vectors as `Tensor<T, 1>`.

I want to try to keep the library very GPU-local. This means that data should be living on the GPU, and only be returned to the CPU for viewing or analysis. To ensure there is no dead/unsynced data on the CPU, `inner` is always set to `None` after synchronizing the data to the GPU for an operation. The user will have to call `.cpu()` manually to transfer data back to the host.

### Tensor Operations

We declare traits for GPU operations:
```rust showLineNumbers
pub trait GpuAdd<Rhs = Self> {
    type Output;
    fn gpu_add(self, rhs: Self) -> Self::Output;
}

pub trait GpuMul<Rhs = Self> { /* ... */ }
pub trait GpuScale<T> { /* ... */ }
```

Operations like addition and scaling work for all `Tensor<T, R>` in the same manner---we simply iterate over a flat array and perform the same operation on every element individually. We can thus implement `GpuAdd` and `GpuScale` for tensors of all ranks with the same code and kernel:

```rust showLineNumbers
impl<T, const R: usize> GpuAdd<T> for Tensor<T, R> {
    type Output = Self;

    fn gpu_add(mut self, mut rhs: Self) -> Self {
        assert_eq!(self.shape(), rhs.shape());

        // We use lazy_static to access a global CUDA context struct.
        let ctx = CUDA_CTX.lock().unwrap();

        self.gpu();
        rhs.gpu();

        let (bs, gs) = /*...*/

        // The CudaCtx struct also stores the kernel modules.
        let CudaCtx {
            ref tensor,
            ref stream,
            ..
        } = *ctx;

        unsafe {
            launch!(tensor.add<<<gs, bs, 0, stream>>>(
                self.device_ptr().as_ref().unwrap().as_device_ptr(),
                rhs.device_ptr().as_ref().unwrap().as_device_ptr(),
                len as i32,
            ))
            .unwrap()
        }

        self
    }
}
```

Multiplication is not as straightforward. The product of two `Vector`s, for example, should output a scalar, whereas the product of two matrices should output a matrix with different dimensions. Const generics are of great help here. We can write different implementations of `Mul` for tensors of various ranks whilst keeping everything neatly organized in one `Tensor` type!

### Dynamic PTX Compilation

There is a problem with shipping pre-compiled PTX code---nothing guarantees that the same code will run on another machine. We want to dynamically compile the PTX code on the host machine during the build process, so the user can use their own `nvcc` instance.

Fortunately the solution is quite trivial. We simply run `nvcc` with `-ptx` in `build.rs` to output the PTX in a specified directory.

However, we soon realize that there is another problem. Let's go back to the kernel we saw earlier in this post, and notice that we only accept pointers to `float`s (or `f32`) as arguments. But what if the user wants to use, say, `f64` instead?

Two things are needed to solve this problem. We must
1. compile new kernels that accept user-specified types as arguments; and
2. determine at runtime which kernel to run based on the type `T` being used in the tensor type.

Part 1 we can solve with simple string manipulation in `build.rs`; we read the CUDA file, duplicate the kernels' code, change the arguments and name with string manipulation, and append it to the file.$^{[2]}$ We determine the supported types from the crate features.

For Part 2, we can use some cool Rust mechanisms to determine `T` at runtime, namely `TypeId`:

```rust showLineNumbers
fn get_type<T>() -> &'static str {
    let t = TypeId::of::<T>();

    if t == TypeId::of::<f32>() {
        return "float";
    }

    if t == TypeId::of::<f64>() {
        return "double";
    }

    /*...*/    
}
```

Let `t = get_type<T>()`. Then in our `launch!` macro we simply invoke the kernel `{kernel}_{t}`.

### Tensor Views

**Updating soon...**

## Footnotes
[1]: It turned out that I was just bad at searching, [dfdx](https://github.com/coreylowman/dfdx) being a great counterexample to the statement I made. But we ball

[2]: Perhaps it would have been reasonable to assume that only `f32` and `f64` will ever be used, so manual duplication of kernel code would have been far simpler.
