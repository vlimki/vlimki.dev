---
title: "Handwritten Digit Recognition From Scratch in Haskell"
description: 'Learning about neural networks, linear algebra, and Haskell with a hands-on project - training a neural network on MNIST from scratch.'
published: false
post: true
date: '2024-07-12'
slug: 'haskell-mnist'
tags: ['haskell', 'linalg', 'ml']
---

<script>
  import Image from '$lib/components/Image.svelte';
</script>

## Notes
Do I go like this:
1. Intro to NNs - what is a neural net? Visualizations, theory, etc.
2. Forward prop (concept + math) & implementation
3. Backprop (concept + math) & implementation
4. Training on XOR
5. Improvements
6. Scaling & training on MNIST

Or like this:
1. Intro to NNs - what is a neural net? Visualizations, theory, etc.
2. Mathematics to forward propagation and backpropagation
3. Implementation of the entire network
4. Training on XOR
5. Improvements
6. Scaling & training on MNIST

The former probably.

ChatGPT elaboration:

1. **Introduction to Neural Networks**
    - Overview of neural networks
    - Importance and applications
    - Basic structure and terminology
    - Brief review of linear algebra essentials (vectors, matrices, etc.)
    - Activation functions and their roles

2. **Forward Propagation**
    - Concept and mathematical formulation
    - Step-by-step forward propagation in a neural network
    - Implementation of forward propagation in Haskell

3. **Backpropagation**
    - Concept and mathematical formulation
    - Detailed explanation of the gradient descent algorithm
    - Implementation of backpropagation in Haskell

4. **Training on XOR**
    - Explanation of the XOR problem
    - Training the neural network on the XOR dataset
    - Analyzing results and understanding errors

5. **Improvements and Optimization**
    - Techniques for improving neural network performance
    - Regularization, learning rate adjustments, etc.

6. **Scaling Up: Training on MNIST**
    - Introduction to the MNIST dataset
    - Preprocessing data for Haskell
    - Training the neural network on MNIST
    - Evaluating performance and discussing results

7. **Conclusion and Future Directions**
    - Summary of what was learned
    - Potential next steps and further reading

___

## Foreword

Neural networks are one of the most important cornerstones of machine learning, hence it's important to understand them extremely well, and be capable of working with one. Hence I've dedicated so much time to writing just this one post that summarizes most of the things I've learned, as opposed to writing many smaller posts. It's very important to see how all the small things in a neural network work together, and how they're connected.

Arguably the best way to learn is to build things. Which is why I took on the challenge of writing a neural network from scratch in Haskell, and trained it on the MNIST handwritten digit recognition dataset. A neural network is actually the perfect project for a machine learning engineer; not only is it terribly important knowledge, but it's also **perfectly** challenging to implement.

In this post I'll be going over all of the important neural network knowledge: what is a neural net, why it is a thing, how it works, the mathematics behind it, and an implementation in Haskell... Haskell!?

### Why Haskell?

Certainly it's not the most convenient language to be writing a neural network in --- but it sure is the most fun! Haskell is very theoretical and great for expressing mathematics. Considering the fact that our implementation is literally nothing but mathematics, Haskell is a great fit. I also chose it for personal reasons --- mainly due to the fact that I really like mathematics, but I also believe that Haskell will greatly assist me at majoring in mathematics in university.
___

## A Brief Introduction to Neural Networks

<div class="my-3" />

### What Is a Neural Network?

A neural network is essentially a model that tries to mimic how the human brain learns. It has layers of neurons that pass on data to other layers to eventually arrive at some computation. We'll look into how this works shortly --- and how the human brain relates to it. 

Before we've only gone over **shallow learning algorithms** (e.g. [linear regression](https://vlimki.dev/writing/day3) or [support vector machines](https://vlimki.dev/writing/day14)) --- neural networks on the other hand, are called **deep learning algorithms**. What this essentially means is that they are much more complex, and are better at finding non-linear and complex relationships in data. Shallow learning algorithms are simpler, faster and more convenient, but they really start struggling when data is not linearly separable. 

Most of the cool machine learning projects you see --- self-driving cars, image recognition, or large language models to name a few --- are based on deep learning algorithms. Usually real-world tasks are very complicated, so heavier and scalable models are needed to compensate. Neural networks are at the heart of deep learning algorithms. This is what makes learning about them so important. Most of the important deep learning algorithms are just derivatives of neural networks anyway. A lot of them even contain the world neural network in them.


### How do Neural Networks Learn? (And a Biology Lesson)

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

The **activation function** is what gives the neural network its ability to perform so well even when data isn't linearly separable. As a matter of fact, if you removed the activation functions from neural networks, you'd just end up with an overcomplicated linear regression ([here is an excellent article on why that is the case](https://towardsdatascience.com/why-neural-networks-have-activation-functions-9732e5405d4e))! Typical activation functions are for example the logistic function (familiar from logistic regression), ReLU, or tanh.

The information flows forward in a neural network by a process called **forward propagation**.