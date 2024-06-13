---
title: "Linear & Logistic Regression - Day 3 of ML"
description: "What if you wanted to fit a line into data?"
published: true
date: '2024-06-10'
slug: 'day3'
tags: ['journey', 'ml']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 3.5h <br /> **Total**: 13h/10000h

Probably will be looking into statistics and more math next, to get a **really** solid math base. Machine learning models will start making much more sense when one knows a lot of math. Besides - math is fun!
___

Most machine learning courses tend to teach **linear regression** as an introduction to ML - and I think that's for a good reason. Linear regression very clearly highlights the main point of what machine learning is at the core - **finding optimal parameters for a certain task**.

Let's go back to some mathematics. We know that the equation for a line is $y = wx + b$, where $w$ is the slope of the line, and $b$ is the y-intercept. In machine learning $w$ stands for a **weight** and $b$ stands for **bias**. The point of linear regresion is to find the optimal values for $w$ and $b$ so that the line fits the data as well as possible. Let's look at an example dataset:

<Image src="/images/posts/day3/dataset.png" text="Visualization of a dataset. (ChatGPT/matplotlib)" />

We have a bunch of **labeled** data points $\{(x_i, y_i)\}_{i=0}^{n}$ as our dataset. Labeled means that our dataset contains examples with the "correct answers" for each data point. That's what's called **supervised learning**. Okay. Imagine we added another data point that followed a similar trend to the current ones. We need some kind of mechanism that can (decently) accurately predict the $y$ value from just a given $x$ value (denoted $\hat y$). There will always be a slight error in the prediction, but the point is to make the error low enough for the model to be useful:
> "All models are wrong, but some are useful."

A good way to do it algorithmically is by [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent). We'll probably look into it later but for now it's outside of our scope. Here's an illustrated example of a similar dataset with a line that is optimally fit for it:

<Image src="/images/posts/day3/optimal-fit.png" text="Visualization of a dataset (a similar one) with an optimal fit. (ChatGPT/matplotlib)" />

See the green dotted lines? That's called the **loss** $L$ per data point, calculated $L_i = y_i - {\hat y}_i$. The **cost** $J$ of the function is given by the average loss of each data point:
$$
J = \frac{1}{n}\sum\limits_{i=1}^{n}{(y_i - {\hat y}_i)^2}
$$

There are many different ways for calculating the loss, the one shown being called **mean squared error (MSE)**. It's introductory and very simple to understans. We will eventually use it in gradient descent to algorithmically calculate the optimal fit.

Imagine if this was about predicting housing prices. For now we've only had one parameter $x$, so we can only represent one of the features of the house. House prices often aren't that simple to predict.  So let's have more features. Let's denote our feature vector $\mathbf{x} = \{x_1,\, x_2,\, \ldots\, x_{n-1},\, x_n\}$. $x_1$ for example could represent the area of the property, $x_2$ could represent the number of bedrooms, etc. This is now called **multiple linear regression**. It is mathematically notated as follows:

$$
\sum\limits_{i=1}^{n}{w_i x_i} + b = w_1 x_1 + w_2 x_2 \ldots w_{n-1} x_{n-1} + w_n x_n + b
$$

where $x_i$ is some feature and $w_i$ is the corresponding weight parameter for the feature.

I tried doing some simple linear regression from scratch with [London housing prices](https://www.kaggle.com/datasets/arnavkulkarni/housing-prices-in-london) in Python to follow the code-centric learning principle. Let's analyze the dataset a bit first:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("housing.csv")

# only select data points where the area is less than 2000 sqft for simplification
X_filter = df[df["Area in sq ft"] < 2000]

X = X_filter["Area in sq ft"]
Y = X_filter["Price"]

plt.scatter(X, Y)
plt.legend()
plt.xlim(0, 2000)
plt.ylim(0, 1000000)
plt.xlabel('Area in sq ft')
plt.ylabel('Price')
plt.grid(True)
plt.show()

```

<Image src="/images/posts/day3/linreg-0.png" text="Visualization of the dataset." />

Looks like a quite widely spread dataset. Let's try drawing some lines:

```python
# arbitrary values
w = 800
b = 1000

def f(x, w, b):
    return w * x + b

...

x = np.linspace(0, 10000, 3480)
y = f(x, w, b)

plt.plot(x, y, color='red')
plt.scatter(X, Y)
plt.legend()
plt.xlim(0, 2000)
plt.ylim(0, 1000000)
plt.xlabel('Area in sq ft')
plt.ylabel('Price')
plt.grid(True)
plt.show()
```

<Image src="/images/posts/day3/linreg-1.png" text="Plotting a line with arbitrary parameters." />

Let's try calculating the MSE for this line:

```python
def loss(w, b, x, y):
    # prediction
    pred = f(x, w, b)

    return y - pred

def mse(w, X, b, Y):
    n = len(X)

    total_cost = 0

    for i in range(n):
        x = X.iloc[i]
        y = Y.iloc[i]
        
        total_cost += loss(w, b, x, y) ** 2

    return (1 / n) * total_cost
```

```python
>>> print(mse(X, Y, w, b))
281826785588.3111
```

That is quite a large error. Let's try changing the parameters a bit. Say we set $w$ to $1000$ and $b$ to $10$:

```python
w = 1000
b = 10
```

<Image src="/images/posts/day3/linreg-2.png" text="A new line with adjusted parameters." />

```python
>>> print(mse(X, Y, w, b))
233602604396.46835
```

That is slightly better. The error is still really large but that's mainly due to the dataset being very widely spread and dealing with large values.

Anyway, this kind of manual labor is tedious and imprecise. Doing this algorithmically would be much better (and more fun!).

## Logistic regression

Alright, linear regression is good for when you want to generate a number as an output - but that's not always the case. What if you wanted to predict whether something belonged in a certain category?

For that, we have **classification** models - perhaps the simplest of which would be the model we'll be looking at next, **logistic regression**.

Linear regression tried to predict a real number $y$ given a list of parameters (or features) $x_1, x_2 \ldots x_{n-1}, x_n$. Logistic regression instead tries to compute the **probability of the output belonging to a certain category**, in this case resembled by either 0 or 1. The principle of logistic regression is to try to fit a [logistic curve](https://en.wikipedia.org/wiki/Logistic_function) into a dataset. This is how it looks:
<Image src="/images/posts/day3/logreg.png" text="Visualization of logistic regression. (ChatGPT/matplotlib)" />

Let's try to look at this with an example. Maybe the dataset could represent microwaved food. The $x$ value represents the time in the microwave in minutes, and the $y$ value represents whether the food will be sufficiently warm after being microwaved for that $x$ minutes. So here the set of output values (the categories) would be $\{cold, warm\}$. When the time spent in the microwave is low, the food is too cold.

So for example, in the image the model predicts that after 1.5 minutes spent in the microwave, the food has roughly a 50% chance of being sufficiently warm.

Let's get into the math part. The logistic curve is defined mathematically as
$$
\frac{1}{1 + e^{-x}}
$$

The logistic regression model expands it to:
$$
\frac{1}{1 + e^{-(wx + b)}}
$$

where again, $w$ and $b$ are the parameters.

But what if you have other features too, for example the starting temperature of the food, or how much food there is on the plate? Well, as with multiple linear regression, there is an equivalent for logistic regression as well. You simply replace the term $wx + b$ with $\sum\limits_{i=1}^{n}{w_i x_i} + b$, so we end up with:

$$
\frac{1}{1 + e^{-(\sum\limits_{i=1}^{n}{w_i x_i} + b)}}
$$

This is called **multivariate logistic regression**. The reason as to why multiple linear regression is not called multivariate linear regression (which sounds cooler) is because it refers to another [model](https://en.wikipedia.org/wiki/General_linear_model), which tries to predict multiple outputs.

This was a very compact introduction. It's a shame that most of the interesting mathematics and code is in the algorithm for finding the parameters - gradient descent. Will have to look into that eventually.
