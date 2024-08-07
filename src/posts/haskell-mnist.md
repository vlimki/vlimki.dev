---
title: "Handwritten Digit Recognition From Scratch in Haskell"
description: 'Learning about neural networks, linear algebra, and Haskell with a hands-on project - training a neural network on MNIST from scratch.'
published: true
post: true
date: '2024-07-15'
slug: 'haskell-mnist'
tags: ['haskell', 'linalg', 'ml']
---

<script>
  import Image from '$lib/components/Image.svelte';
</script>

## Foreword

Neural networks are one of the most important cornerstones of machine learning, hence it's important to understand them extremely well, and be capable of working with one. Hence I've dedicated so much time to writing just this one post that summarizes most of the things I've learned, as opposed to writing many smaller posts. It's very important to see how all the small things in a neural network work together, and how they're connected.

Arguably the best way to learn is to build things. Which is why I took on the challenge of writing a neural network from scratch in Haskell, and trained it on the MNIST handwritten digit recognition dataset. A neural network is actually the perfect project for a machine learning engineer; not only is it terribly important knowledge, but it's also **perfectly** challenging to implement.

In this post I'll be going over all of the important neural network knowledge: what is a neural net, why it is a thing, how it works, the mathematics behind it, and an implementation in Haskell... Haskell!?

### Why Haskell?

Certainly it's not the most convenient language to be writing a neural network in --- but it sure is the most fun! Haskell is very theoretical and great for expressing mathematics. Considering the fact that a neural network is literally nothing but math, Haskell is a great fit. I also chose it for personal reasons --- mainly due to the fact that I really like math, but I also believe that Haskell will greatly assist me at majoring math in university.

### Prerequisites
The prerequisites for this post can really just be boiled down to high school calculus knowledge and the basics of linear algebra (mostly matrices, their dimensions and matrix multiplication).

___
## A Brief Introduction to Neural Networks

<div class="my-3" />

### What Is a Neural Network?

A neural network is essentially a model that tries to mimic how the human brain learns. It has layers of neurons that pass on data to other layers to eventually arrive at some computation. We'll look into how this works shortly --- and how the human brain relates to it. 

Before we've only gone over **shallow learning algorithms** (e.g. [linear regression](https://vlimki.dev/writing/day3) or [support vector machines](https://vlimki.dev/writing/day14)) --- neural networks on the other hand, are called **deep learning algorithms**. What this essentially means is that they are much more complex, and are better at finding non-linear and complex relationships in data. Shallow learning algorithms are simpler, faster and more convenient, but they really start struggling when data is not linearly separable. 

Most of the cool machine learning projects you see --- self-driving cars, image recognition, or large language models to name a few --- are based on deep learning algorithms. Usually real-world tasks are very complicated, so heavier and scalable models are needed to compensate. Neural networks are at the heart of deep learning algorithms. This is what makes learning about them so important. Most of the important deep learning algorithms are just derivatives of neural networks anyway. A lot of them even contain the world neural network in them.


### How are Neural Networks Structured? (And a Biology Lesson)

As I mentioned before, a neural network tries to follow a similar model for learning as the human brain does. Let's look into how the human brain learns first.

Our brain is an insanely complex organism --- it has approximately **86 billion** neurons. A **neuron** is the basic unit in the brain --- they're specialized cells that have a job of transferring information. They're pass information to each other through what's called **synapses**, which are essentially just bridges between the neurons. What learning means for the human brain is the weakening or strengthening of these synaptic connections.

<Image src="/images/posts/haskell-mnist/biological-neurons.jpg" text="Biological neurons (learnopencv.com)" />

1. The dendrites accept new information.
2. The neuron does some computation on the information.
3. The newly computed information goes through the axon to the synapses, and over to the next neuron.

Alright, how does a model like this get recreated artificially on a computer? I think it'll first be helpful to show a visualization of an artificial neural network --- and I bet most people with an interest for ML have already seen a visualization like this:

<Image src="/images/posts/haskell-mnist/ann.png" text="Visualization of an artificial neural network (ChatGPT/matplotlib)" />

Every one of those units is an artificial neuron and the lines drawn between them represent synapses. Let's take a closer look:

<Image src="/images/posts/haskell-mnist/comparison.png" text="Comparison of an artificial and a biological neuron. (powerelectronicsnews.com)" />

So similarly as the biological neuron has dendrites that receive inputs, the artificial neuron also receives a vector of inputs. The strength of the synaptic connections is represented by the two parameters we're already familiar with --- the **weight vectors** $w_1 \dots w_n$ and the **biases** $b_1 \dots b_n$. The neural network tries to find the optimal parameters $w$ and $b$ for every single neuron in the network. That can take a while, especially when you have millions --- or **trillions** of parameters, like GPT-4 does. The network we'll be building for the MNIST problem has roughly $530,000$ parameters.

The **linear function** seen in the image is just the same $w \cdot x + b$ expression we have seen in many other algorithms. The **activation function** is what gives the neural network its ability to perform so well even when data isn't linearly separable. As a matter of fact, if you removed the activation functions from neural networks, you'd just end up with an overcomplicated linear regression ([here is an excellent article on why that is the case](https://towardsdatascience.com/why-neural-networks-have-activation-functions-9732e5405d4e))! Typical activation functions are for example the logistic function (familiar from logistic regression), ReLU, or tanh.

So at essence, a neural network is just an array of layers, and layers in turn are an array of neurons. In a layer, the only thing unique to a neuron is its weight vector $\mathbf{w}$ and the bias scalar $b$.

How would we represent this kind of structure in code? Well, let's go back to some linear algebra. In neural networks, input vectors are usually represented as column vectors. This may seem quite unintuitive since they are often stored as row vectors in a data frame, for example.

Let's start with the linear function. So, for us to be able to evaluate the expression $\mathbf{w} \cdot \mathbf{x}$, we need a row vector $\mathbf{w}$ of the same length as the input vector $\mathbf{x}$. Remember that the input vector will get passed on to every neuron in each layer, so we will need $n$ row vectors $\mathbf{w}_1 \dots \mathbf{w}_n$ for every layer, where $n$ is the number of neurons in the layer of interest. Consider $m$ as the length of the input vector. So this far we have:

$$
\mathbf{w}_i \cdot \mathbf{x} + b_i = \begin{bmatrix}w_i^{(1)} \dots w_i^{(m)} \end{bmatrix} \begin{bmatrix} x^{(1)} \\ \vdots \\ x^{(m)} \end{bmatrix} + b_i
$$

for every neuron $\{(\mathbf{w_i}, b_i)\}_{i=1}^n$.

However, representing weights and biases on a neuron basis in code is a bit inconvenient. Hmm... what's a good way of representing an array of weight vectors? Well, a weight matrix! This way we can group the weight vectors of every neuron just one structure per layer --- the weight matrix $\mathbf{W}$. It's the same thing with biases --- we can combine every bias value into a single bias vector $\mathbf{b}$.

We can now represent the linear function $z_l$ of the layer $l$ as the following expression:
$$
z_l = \mathbf{W} \cdot \mathbf{x} + \mathbf{b} = \begin{bmatrix} w_1^{(1)} & \dots & w_1^{(m)} \\ \vdots & \ddots & \vdots \\ w_n^{(1)} & \dots & w_n^{(m)} \end{bmatrix} \begin{bmatrix} x^{(1)} \\ \vdots \\ x^{(m)} \end{bmatrix} + \begin{bmatrix}b_1 \\ \vdots \\ b_n \end{bmatrix}
$$

This is matrix-vector multiplication. The result of $\mathbf{W} \cdot \mathbf{x}$ is another column vector, and we just add the bias vector to that. Sounds simple enough?

The activation part is simple. We can denote it as:
$$
a_l = g(z)
$$
where $g$ is some activation function. Note that we apply $g$ to $z$ on an element basis.

Now that we have all of that covered, how would we actually represent a neural network in code? Well, a network doesn't need to be anything more complicated than a list of layers. So let's define ourselves a layer type:

```haskell showLineNumbers title="Layer Type Definition"
-- The layer type. The parameters in the network are stored on a layer basis.
-- weights     = weight matrix
-- biases      = bias matrix 
-- sz          = number of neurons
-- activation  = the activation function
data Layer = Layer
  { weights :: Matrix R
  , biases :: Matrix R
  , sz :: Int
  , activation :: (R -> R)
  }
```

Don't worry about `R`, it's just a type synonym for a `Double` (and the letter R comes from the set of real numbers $\mathbb{R}$). In Haskell, functions are denoted as `Argument Type -> Argument Type -> Return Type`. Our activation function takes one real number as an argument and returns another real number. Note that the bias vector is a matrix of size $n \times 1$ ($n$ rows and $1$ column, so it's a column vector). It could totally well be a `Vector R`, but it's easier to just put a matrix there due to how matrix multiplication will be handled later.

Let's also define a function called `activate`, which takes a `Layer` and an input vector as parameters and returns us the activation value $g(z)$ for the layer.

```haskell
activate :: Matrix R -> Network -> Matrix R
activate input layer = cmap (activation l) (weights layer <> x + biases layer)
```

In Haskell, `::` is used to denote a type signature. The second line is the function body itself. This function definition is very simple. All you need to know to understand it is that `<>` stands for matrix multiplication, and `cmap` is a function that applies some function on a matrix element-wise.

A neural network with just one layer and the logistic activation function is just logistic regression. Let's try this out with GHCi (an interactive Haskell environment). Recall that the logistic activation function is defined as $\frac{1}{1 + e^{-z}}$.

```haskell
ghci> sigmoid x = 1 / (1 + exp (-x))
ghci> l = Layer { weights = (1><1) [0.5]
                , biases = (1><1) [1]
                , sz = 1
                , activation = sigmoid }
ghci> input = (1><1) [0.123]
ghci> activate l x
(1><1)
 [ 0.7429770928842059 ]
```

Works as expected. This is just normal logistic regression where $w = 0.5$ and $b = 1$. Note that the `(n><m)` notation is used for creating a matrix with $n$ rows and $m$ columns.

There is an important detail here --- we initialized both the weight matrix and the bias vector to be of size $1 \times 1$. We concluded before that the weight matrices and bias vectors must have a specific size; in particular, the weight vector must be of size $n \times m$, where $n$ is the number of features in the input vector, and $m$ is the number of neurons in the current layer. We also found that the bias vector must be of length $m$.

Let's make functions that automate the entire network creation process --- including initializing weight and bias vectors of the proper size. Let's start with a function `initialize`, that essentially just creates placeholder `Layer` structures and lets the user determine the activation function and size of each layer:

```haskell
-- Initialize the network. Note that the dimensions of the weight and bias matrices aren't calculated here yet.
-- This only initializes the layer structures with their intended numbers of neurons and activation functions.
initialize :: [Int] -> [R -> R] -> Network
initialize szs as = 
  map (\(x, a) -> Layer{weights = (0><0) [], biases = (0><0) [], sz = x, activation = a}) $ zip szs as
```

So we take a list of integers for the layer sizes, and a list of activation functions of the form `R -> R` (or $\mathbb{R} \to \mathbb{R}$). `zip` converts the two lists into one list of tuples `[(Int, R -> R)]`. We map over that list and create a layer type for each element.

Let's try this function out in `ghci`:
```haskell
ghci> a = initialize [4, 1] [sigmoid, sigmoid]
ghci> :type a
a :: Network
```

Before we go any further, let's create helper functions for initializing matrices with random values. Why? It is good practice to initialize the weights and biases in your neural network with random values, in order to prevent it from hitting local minima.

```haskell showLineNumbers title="Initialization Function Helpers"
-- The xavier weight initialization method. It works well with the sigmoid activation function.
-- n = the number of neurons
-- m = the number of features in the input vector
initWeights :: Int -> Int -> IO (Matrix R)
initWeights n m = do
  let limit = sqrt (2.0 / fromIntegral n)
  -- Generate a list of random numbers in the range [-sqrt(2/n), sqrt(2/n)], where n = number of neurons
  values <- replicateM (n * m) (randomRIO (-limit, limit))

  -- Build a matrix (n rows, m columns) from the list of values that `replicateM` outputs
  return $ (n >< m) values

-- Initialize every bias to a random value from the range [-0.1, 0.1].
initBiases :: Int -> IO (Matrix R)
initBiases n = do
  values <- replicateM n (randomRIO (-0.1, 0.1))
  return $ (n >< 1) values
```

Note that these function returns `IO (Matrix R`. It means that this function is not pure since it needs to perform an I/O operation for generating random numbers. You can read more on Haskell I/O AAAAAAAAAaahere.

Let's now make a function that automatizes the initialization process for the weights and biases using the functions we just defined, given just an input vector $\mathbf{x}$. Let's call this function --- in true scikit-learn style --- `fit`:

```haskell showLineNumbers title="Determining The Dimensions Of The Weight And Bias Matrices"
-- This is where the dimensions of the weight and bias matrices get initialized.
fit :: Matrix R -> Network -> IO Network
fit x n =
  mapM
    ( \(layer, idx) -> do
        w <- initWeights (sz layer) (len idx)
        b <- initBiases $ sz layer
        return layer{weights = w, biases = b, sz = sz layer}
    ) $ zip n [0..length n]
  where
    len idx = if idx == 0 then fst (size x) else sz $ n !! (idx - 1)
```

The `len idx` function takes the index of a layer, and calculates the number of features in the input of that layer. If we're dealing with the first layer (or if the index is $0$), we use the length of the input vector to determine the number of features. Otherwise, we use the length of the output vector of the previous layer (which is identical to the number of neurons in that layer). The `!!` operator is used for indexing in Haskell. So we take number of neurons in the `idx - 1`th layer. We iterate over `(layer, index)` pairs which we again get with the `zip` function.


Now that we have the core structure of the network defined, let's get to the cool part --- how do we actually get the network to learn?

## How Neural Networks Actually Learn

The information flows forward in a neural network by a process called **forward propagation**. This is how the neural network runs the information through to ultimately compute the end result. But forward propagation isn't very useful by itself. There must be some algorithm that keeps updating our parameters $w, b$ for every neuron to get closer to a better fit. That sounds familiar --- and indeed it is; we can use gradient descent, just like we previously have! In particular, we want to use an application of gradient descent called **backpropagation**.

### Forward Propagation

Essentially forward propagation just does the two following steps:
1. Does computations and calls the activation function on a layer.
2. Take the output of that layer and treat it as the input to the next layer.
3. Repeat 1-2 from the first layer all the way to the output layer.

We can view forward propagation as a function composed of all the layer computation functions. Consider us having three layers $l_1$, $l_2$ and $l_3$. Let $f_{n}$ represent the entire computation (the linear function + the activation function) for some layer $l_n$. We can now express the entire forward propagation algorithm as:
$$
f_3(f_2(f_1(\mathbf{x})))) = (f_3 \circ f_2 \circ f_1)(\mathbf{x})
$$

That's all it is. So we just repeat the same process on every layer, using the output of the previous layer. To make notation consistent, $l_0$ is often used to represent the input vector $\mathbf{x}$ as the **input layer**.

I find this quite funny --- the entire forward propagation function can be expressed using just two words in Haskell. Literally, just two words. Let's take a slightly longer approach first and simplify from there for optimized understanding.

In Haskell, there is a function `foldl` that essentially maps over a list with an accumulator. It's a bit like JavaScript's `reduce` function. Let's take a look at the type of `foldl`:

```haskell
ghci> :type foldl
foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b
```

The `Foldable t =>` part means that the generic type `t` has to be a part of the `Foldable` typeclass. It's just like Rust's trait system (except it was established way back in the 80s). So the arguments are: 
1. a function that takes two arguments of types `b` and `a` (in our case, `a` and `b` will be `Layer` and the input vector `Matrix R` respectively) and returns another `b` (`Layer`, that is),
2. a `Foldable` (in our case a list) of values of type `a` (a list of `Layer` --- the `Network` type),
3. and the inial accumulator value (the input vector).

Let's look into how this compares with JavaScript's `reduce` function. If you've seen the code for getting the sum of an array in JavaScript:

```javascript
[1, 2, 3].reduce((a, b) => a + b)
```

you will understand how our implementation works. The difference is that `foldl` is explicitly specified the initial accumulator value, whereas `reduce` just implicitly uses the first element in the array as the initial accumulator.

Here's how to replicate the array sum in Haskell using `foldl`:

```haskell
foldl (\a b -> a + b) 0 [1, 2, 3]
```

We use `0` as the initial accumulator value. Otherwise the code looks very similar.

Well, enough of that. Let's get into the actual forward propagation implementation now. Here's how it looks:

```haskell
forwardProp :: Matrix R -> Network -> Matrix R
forwardProp input net = foldl (\inp layer -> activate inp layer) input net
```

We take two arguments --- the initial input vector and the network. We fold over a list of `Layer`s with an accumulator of type `Matrix R`, which will be the input to the current layer we're folding over. Due to Haskell's currying ([read more here]()), we can simplify this code a bit:

```haskell
forwardProp :: Matrix R -> Network -> Matrix R
forwardProp input net = foldl (activate) input net
```

Haskell is able to recognize that we will directly be calling another function with our lambda function's parameters, in the same order that in which they're defined. As a matter of fact, we can take this even further and utilize this on the actual function declaration:

```haskell
forwardProp :: Matrix R -> Network -> Matrix R
forwardProp = foldl activate
```

Think about it. If `forwardProp x y = foldl activate x y`, should it not follow that `forwardProp = foldl activate`?

Anyway, THAT is a concise forward propagation function. Tell me that is not beautiful. You may see why I find it so fun to write Haskell code.

We can now test our code:
```haskell
forwardPropagate :: Matrix R
forwardPropagate = do
    let n1 = initialize [2, 2, 1] [sigmoid, sigmoid, sigmoid] [sigmoid', sigmoid', sigmoid']
    let exampleInput = (2 >< 1) [0, 1]
    -- We need to use the <- operator since `fit` is returns `IO Network`.
    n2 <- fit exampleInput n1
    forwardProp exampleInput n2
```

Remember the `fit` function works on just one input vector and only cares about the dimensions of it.

Let's now test the function:

```haskell
ghci> forwardPropagate
(1><1)
 [ 0.4921254998138297 ]]
```
One neuron in the last layer means we get one output --- the dimensions of our weight initialization functions were indeed correct, and all matrix multiplication operations were carried out with no errors. Nice!

We have now fully implemented forward propagation. What's left for us to do now is to calculate the errors and gradients for the outputs, and compute the adjustments to the parameters $w,b$ for every neuron. Let's do that next.

### Backpropagation

**Backpropagation** is probably one of the harder topics for machine learning beginners to truly grasp --- at least that was the case for me! It's often just seen as a black box that magically results in learning. The mathematical formulas make VERY little sense at first.

> NOTE: This post takes a very direct approach to backpropagation, as opposed to an intuitive one. One may find it helpful to look at a more intuitive explanation of backpropagation first through a resource like Andrej Karpathy's [micrograd video](https://youtube.com/watch?v=VMj-3S1tku0).

We shall get started. Backpropagation is fundamentally just gradient descent. We use the chain rule from calculus to calculate the gradients for every parameter in every layer. We go backwards in the network; we start at the output layer, and then propagate gradients all the way back to the first hidden layer.

First, just like gradient descent, we take the loss of the forward-propagated output (=the difference of the target output and the prediction).

$$
\delta^{[L]} = (\mathbf{\hat y} - \mathbf{y}) \cdot \sigma'(\mathbf{Z}^{[L]})
$$

We multiply the loss with the expression $\sigma'(\mathbf{Z}^{[L]})$, where $\sigma'$ is the derivative of the activation function of the last layer, and $\mathbf{Z}^{[L]}$ is the output of the linear function of the last layer (so no activation function has been applied to it yet).

Now we have the gradients of the output layer. We can now introduce the formulas from propagating these gradients backwards from the $l$th layer to the layer before it. They're going to be quite a handful of math to grasp for someone with little prior experience, so bear with me here.

For the $l$th layer, we can get the previous layer's ($l - 1$) gradients with the following formula:
$$
\delta^{[l - 1]} = (\mathbf{W}^{[l]})^T \cdot \delta^{[l]} \cdot \sigma'(\mathbf{Z}^{[l-1]})
$$
where
- $\mathbf{W}^{[l]}$ is the weight matrix for the $l$th layer,
- $\delta^{[l]}$ is the computed gradients for the $l$th layer, and
- $\sigma'(\mathbf{Z}^{[l - 1]})$ is the derivative of the $l$th layer's activation function, with respect to the output of the linear function of the previous layer.

Alright! Now that we can propagate the gradients backwards, how do we actually update the parameters for each layer?

We have formulas for updating both the weight matrix $\mathbf{W}$ and the bias vector $\mathbf{b}$ for every layer. They're actually exactly like the gradient descent formulas, so this should be nothing new:

$$
\mathbf{W}^{[l]} \leftarrow \mathbf{W}^{[l]} - \eta \frac{\partial \mathbf{L}}{\partial \mathbf{W^{[l]}}}
$$
$$\mathbf{b}^{[l]} \leftarrow \mathbf{b}^{[l]} - \eta \frac{\partial \mathbf{L}}{\partial \mathbf{b^{[l]}}}
$$
where $\eta$ is the learning rate. **However**, the calculation of the partial derivatives $\frac{\partial \mathbf{L}}{\partial \mathbf{W^{[l]}}}$ and $\frac{\partial \mathbf{L}}{\partial \mathbf{b^{[l]}}}$ differs quite a bit.

We obtain $\frac{\partial \mathbf{L}}{\partial \mathbf{W^{[l]}}}$ with the following formula:

$$
\frac{\partial \mathbf{L}}{\partial \mathbf{W^{[l]}}} = \delta^{[l]}(A^{[l - 1]})^T
$$

Here $A^{[l-1]}$ is the output of the previous layer (with the activation function applied), or in other words, the input to the $l$th layer, and $\delta^{[l]}$ is the gradients we previously computed.

Fortunately the computation for $\frac{\partial \mathbf{L}}{\partial \mathbf{b^{[l]}}}$ is very simple. As a matter of fact:
$$
\frac{\partial \mathbf{L}}{\partial \mathbf{b^{[l]}}} = \delta^{[l]}
$$

Now that we have all of the math covered, we should be ready for a code implementation.

Note first, that in order to backpropagate the gradients, we actually need the outputs for every layer. This means we must adjust our forward propagation function slightly. Here's a new version:

```haskell
forwardProp :: Matrix R -> Network -> Matrix R
forwardProp = scanl activate
```

The only edit we did was changing the `foldl` function to `scanl`. These functions are very similar, but `scanl`  returns an array of all the intermediate results as opposed to just the final result. Here's an example:

```haskell
ghci> scanl (\a b -> a + b) 1 [0..10]
[1,1,2,4,7,11,16,22,29,37,46,56]
```

This is what a backpropagation function would look like in Haskell:

```haskell showLineNumbers title="Backpropagation in Haskell"
-- The backpropagation algorithm returns a list of tuples with weights and biases for every layer.
-- outputs = the output from the forwardProp function - so a list of output vectors
-- target = the target output
backProp :: [Matrix R] -> Matrix R -> Network -> [(Matrix R, Matrix R)]
backProp outputs target n = zip dW dB
 where
  outputError = (last outputs - target) * cmap (activation' (last n)) (last outputs)

  reversedLayers = tail $ reverse n
  reversedOutputs = tail $ reverse outputs
  reversedNextLayers = reverse $ tail n

  layersWithOutputs = zip3 reversedLayers reversedOutputs reversedNextLayers
  deltas = reverse $ scanl (flip calculateDelta) outputError layersWithOutputs

  dW = [delta LA.<> tr out | (delta, out) <- zip deltas (init outputs)]
```

Let's go through this code one line at a time.

The `outputError` definition makes quite a bit of sense --- it does closely resembles the mathematical formula out of the box. We simply take the loss and we multiply it with $\sigma'(\mathbf{Z}^{[L]})$ --- the derivative of the activation function of the last layer, with respect to the output of the last layer.

## Solving The XOR Problem

Let's start modeling our network for the XOR problem, which we'll try solving later with our neural network implementation. Let's first define our dataset. The XOR gate can take four different inputs: `[0, 0]`, `[0, 1]`, `[1, 0]` and `[1, 1]`. Hence our set of inputs looks something like this:
$$
\mathbf{X} = \{\begin{bmatrix}0 \\ 0\end{bmatrix}, \begin{bmatrix}0 \\ 1\end{bmatrix}, \begin{bmatrix}1 \\ 0\end{bmatrix}, \begin{bmatrix}1 \\ 1\end{bmatrix}\}
$$

The XOR gate produces the outputs $0, 1, 1, 0$ for the inputs respectively. Hence our set of outputs looks like this:

$$
\mathbf{Y} = \{0, 1, 1, 0\}
$$

Now that we have these sets, we can define ourselves an input matrix that contains every training example and an output matrix that contains every output. We do this to store all of our training data nicely in one structure. Recall that feature vectors are often stored as rows in a dataset, so we'll adopt this convention although it complicates things a bit. Our matrices now look like this:
```haskell showLineNumbers
xorInput :: Matrix R
xorInput = (4 >< 2)
    [ 0, 0
    , 0, 1
    , 1, 0,
    , 1, 1
    ] ::
    Matrix R

xorOutput :: Matrix R
xorOutput = (4 >< 1) 
    [ 0
    , 1
    , 1
    , 0 ]
```

Let's also define a helper function to turn a matrix into an array of its rows (so we can eventually iterate over each training example when training the network):
```haskell
-- Converts a matrix into a list of column vectors from its rows
matrixToRows :: Matrix R -> [Matrix R]
matrixToRows x = map (tr . asRow) (toRows x)
```

The `toRows` function turns a `Matrix R` into a `[Vector R]`. We then map over that array, first converting each vector into a row matrix, and then transposing that matrix with the `tr` function. The `.` operator stands for the function composition operator from mathematics. The expression `(f . g) x` is the same as $(f \circ g)(x) = f(g(x))$.

