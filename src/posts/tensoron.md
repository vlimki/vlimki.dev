---
title: "CUDA-Accelerated Tensor Computation with Rust"
description: "Development log of my library, tensoron, and the MNIST classifier built on top of it."
published: true
post: true
date: '2025-05-07'
slug: 'tensoron'
tags: ['ml', 'cuda']
---

<script>
    import FooterText from '$lib/components/FooterText.svelte';
    import PageBreak from '$lib/components/PageBreak.svelte';
</script>

I wanted to try to make an MNIST classifier from scratch in Rust---a good low-level project to learn about ML basics and the operation of neural networks under the hood. This is something I've experimented with before in Haskell, but with moderate success.

I had recently purchased a 4060 Ti for machine learning purposes, so I decided that this time I would give myself very ambitious performance requirements for the project. This naturally meant that everything should be running on the GPU. Since I was writing this from scratch, I also did not want to use pre-made ML libraries so I could make my own abstractions instead.

I started looking for a sufficiently capable library that could also run operations on the GPU through CUDA---and to my surprise, one did not exist.$^{[1]}$ Obviously the natural next step was to write one myself.

I had three approaches for building my own library:
1. Use the entire `Rust-CUDA` toolkit to write kernels in Rust;
2. Write kernels in C and interact with the compiled PTX with Rust, or
3. Just write everything in CUDA C/C++.

Rust was the trivial choice. However, I now had to choose between options 1 and 2. The problem was that I barely knew how to write CUDA kernels. I had only made extremely basic kernels in the past, so I realized that maybe I can teach myself some CUDA C/C++ and kernel optimization on the way. This would match perfectly with my ambitious performance goals. So option 2 it was.

## Part 1: Writing a Tensor Computation Library

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

We want to give the user a flexible way to analyze tensors on the CPU and perform operations like indexing and slicing. We also want these operations to not be heavy. For this we define **tensor views**. Views store a reference to data in a tensor, and tensor views should merely give methods for interpreting that data without mutating it. This makes chaining operations easy and efficient. Let's define `TensorView<'a, T, R>`.

```rust showLineNumbers
pub struct TensorView<'a, T, const R: usize> {
    shape: [usize; R],
    data: &'a [T],
    strides: [usize; R],
}
```

This allows us to do operations like:
```rust
let t = tensor!([2, 2][1.0, 2.0, 3.0, 4.0]);

t.view().at([0, 1]).value() // 2.0
```
for indexing a matrix.

It is now time to see what the library can do in a real use case. Doing so is most often totally worth the effort; I for example ended up making a lot of API changes because I realized the library was a bit clumsy to use---lots of cloning and redundant typing. This for example made me change the `device_ptr` field of a tensor to an `Arc` to allow for easy cloning. An `Arc` actually works great here, since the device pointer doesn't need to be internally mutated.

## Part 2: Building an MNIST Classifier

We shall not get into the inner workings of neural networks too comprehensively here; the MNIST classifier shall function as merely a proof-of-concept for the tensor library. In building the network, I will be taking a lot of inspiration from [mlp.hs](https://github.com/vlimki/mlp.hs), the project I was referring to at the start of the article. 

Let us start with type definitions. A network is defined simply as an array of `Layer`s, and we may define `Layer` as follows:

```rust showLineNumbers
pub type R = f32;

pub struct Layer {
    weights: Matrix<R>,
    biases:  Matrix<R>,
    activation: Box<dyn Activation>,
    sz: usize,
}
```

<div class="mx-3"/>

### Data Propagation

Recall that in forward propagation we simply do the following operation on the $l$th layer:
$$
a^{[l]} = g\!\bigl(W^{[l]}a^{[l-1]} + b^{[l]}\bigr) \quad (l = 1,2,\dots,N)
$$

where $N$ is the number of layers in our network and $a^{[0]}$ is the input data. We shall also denote by $z^{[l]}$ the linear activation of layer $l$, i.e. the expression upon which the activation function $g$ is called:
$$
z^{[l]} = W^{[l]}a^{[l-1]} + b^{[l]} \quad (l = 1,2,\dots,N)
$$

We will need to store both the pre- and post-activation values for backpropagation. We we may formulate a function for computing them as follows:

```rust showLineNumbers
pub fn forward(&mut self, x: &Matrix<R>) -> (Vec<Matrix<R>>, Vec<Matrix<R>>) {
    // Initialize a[0], z[0] to the input vector
    let mut acc = x.clone();
    let mut z_vec = vec![acc.clone()];
    let mut a_vec = z_vec.clone();
    for layer in self.layers.iter() {
        let z = &(&layer.weights * &acc) + &layer.biases;
        let a = layer.activation.activate(&z);
        acc = a;
        z_vec.push(z);
        a_vec.push(acc.clone());
    }
    (zs, a_vec)
}
```

We must now propagate the data backwards using the chain rule. For this we perform backpropagation.

We first calculate the gradient of the output layer:

$$
\delta^{[N]} = (\hat y - y)\odot g'(z^{[N]})
$$

where $\hat y - y$ denotes the difference between the target output and the predicted output, and $\odot$ stands for componentwise multiplication.


Then we calculate the gradients for the $l$th layer by application of the chain rule:
$$
\delta^{[l-1]} = (W^{[l]})^\top\delta^{[l]}\odot g'(z^{[l-1]}) \quad (l = 1,2,\dots,N)
$$


We then update the network parameters for every layer $l$:
$$
W^{[l]} \leftarrow W^{[l]} - \eta\,\delta^{[l]}(a^{[l-1]})^\top,\quad

b^{[l]} \leftarrow b^{[l]} - \eta\,\delta^{[l]}
$$

where $\eta$ is the learning rate, a small positive real number.

```rust showLineNumbers
fn backprop(
    &mut self,
    (zs, outputs): (Vec<Matrix<R>>, Vec<Matrix<R>>), 
    target: Matrix<R>,
) -> (Vec<Matrix<R>>, Vec<Matrix<R>>) {
    let mut delta = outputs.last().unwrap() - &target;
    delta = delta.gpu_cmul(
        &self
            .layers
            .last()
            .unwrap()
            .activation
            .derivative(zs.last().unwrap()),
    );

    let mut grad_w = Vec::new();
    let mut grad_b = Vec::new();

    for l in (0..self.layers.len()).rev() {
        let a_prev = &outputs[l];
        // weight gradient: delta · a_prev^T
        let dw = &delta * &a_prev.transpose();
        grad_w.push(dw);
        grad_b.push(delta.clone());
        if l > 0 {
            let w = &self.layers[l].weights;
            let prev = &w.transpose() * &delta;
            delta = prev.gpu_cmul(&self.layers[l].activation.derivative(&zs[l]));
        }
    }

    grad_w.reverse();
    grad_b.reverse();
    (grad_w, grad_b)
}
```

In batch gradient descent, we update the parameters by the average of the gradients for each sample in the dataset. We simply loop over the dataset, calculate the gradients, store them, calculate their average for every layer, and update the parameters of each layer.

We are now ready to solve XOR. The XOR dataset is defined as follows:

$$
\mathbf{X} = \{\begin{bmatrix}0 \\ 0\end{bmatrix}, \begin{bmatrix}0 \\ 1\end{bmatrix}, \begin{bmatrix}1 \\ 0\end{bmatrix}, \begin{bmatrix}1 \\ 1\end{bmatrix}\}
$$

The XOR gate produces the outputs $0, 1, 1, 0$ for the inputs respectively. Hence our set of outputs looks like this:

$$
\mathbf{Y} = \{0, 1, 1, 0\}.
$$

We can define these with the `tensor!` macro in Tensoron.

```rust showLineNumbers
let xor_input = tensor!([4,2][
    0, 0,
    1, 0,
    0, 1,
    1, 1
]).map(|x| *x as f32);

let xor_output: Matrix<R> = tensor!([4,1][
    0.0,
    1.0,
    1.0,
    0.0
]);
```

Now we only have to initialize the network, convert the dataset to column vectors, and call
```rust
net.train(&i, &o, 500, lr);
```

We shall evaluate the network now:
```rust showLineNumbers
for input in input_vec {
    let out = net.predict(&input).cpu();
    println!("Prediction: {:#?}", out);
}
```

`cargo r` now yields:
```rust
Prediction: [1, 1][0.0065198555]
Prediction: [1, 1][0.9847574]
Prediction: [1, 1][0.98524183]
Prediction: [1, 1][0.02257292]
```

Learning is definitely happening. Now we simply replace the XOR dataset with the MNIST dataset and update the final layer to use softmax activation.

<PageBreak />

I will later be writing a third section to this article on optimization---the best part in engineering---and benchmarking to give concrete results. Such a section will most likely contain optimizing the network structure, CUDA kernels, Rust code, and more.

## Part 3: Optimization

**Updating soon...**

Notes:
- Read [Learning CUDA by optimizing softmax: A worklog](https://maharshi.bearblog.dev/optimizing-softmax-cuda/)

## Footnotes
[1]: It turned out that I was just bad at searching, [dfdx](https://github.com/coreylowman/dfdx) being a great counterexample to the statement I made. But we ball

[2]: Perhaps it would have been reasonable to assume that only `f32` and `f64` will ever be used, so manual duplication of kernel code would have been far simpler.
