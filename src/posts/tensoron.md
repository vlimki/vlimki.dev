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

### The Start of Tensoron

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

We can define a generic `Tensor<T, const R: usize>`, where `T` is the data type, and `R` denotes the rank of the tensor in the following manner:
```rust showLineNumbers
struct Tensor<T, const R: usize> {
    device_ptr: Option<DeviceBuffer<T>>,
    inner: Option<Vec<T>>,
    shape: [usize; R],
    strides: [usize; R],
}
```

This is very handy, because we can treat different types as a special case of tensors; matrices are simply defined as `Tensor<T, 2>`, vectors as `Tensor<T, 1>`.

I want to try to keep the library very GPU-local. This means that data should be living on the GPU, and only be returned to the CPU for viewing or analysis.

**Updating soon...**

## Footnotes
[1]: It turned out that I was just bad at searching, [dfdx](https://github.com/coreylowman/dfdx) being a great counterexample to the statement I made. But we ball
