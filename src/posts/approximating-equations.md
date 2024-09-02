---
title: "Approximating Systems of Equations Using Gradient Descent"
description: 'Machine learning is just an optimization problem anyways.'
published: true
post: true
date: '2024-09-01'
slug: 'approximating-equations'
tags: ['math']
---
<script>
import Image from '$lib/components/Image.svelte';
</script>

In machine learning, the central task is finding optimal parameters to solve a specific problem. It's not a problem exclusive to just machine learning though --- we can apply gradient descent with a little calculus knowledge to approximate solutions to any real-valued system of equations.

## Solving Systems With a Single Equation
Let us define 
$$
f(x) = x^2 + 2x + 1
$$

Say we want to solve the equation $f(x) = 144$. We can manually arrive at the solution $x = 11$ quickly.

To solve this problem with gradient descent, we require a loss function to know the distance from our target value. We can use the **mean-squared error (MSE)** loss function familiar from machine learning to solve this problem. Using MSE, we formulate our loss function $L(x)$ in the following manner:
$$
L(x) = (y - f(x))^2
$$
where $y$ is the target value and $f(x)$ is the evaluation of $f$ with our current $x$ parameter.

Since this is a convex optimization problem, we must figure out the $x$ parameter which minimizes the loss function. Our optimization problem is therefore $\min L(x)$.

We can utilize calculus knowledge to formulate the derivative of the loss function. According to the chain rule, we have 
$$
\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)
$$

Our loss function is of this form, where $f(x) = x^2$ and $g(t) = t^2 + 2x + 1$.

We then get:
$$
\frac{d}{dx} L(x) = 2(y - f(x)) \cdot \frac{d}{dx} f(x) = 2(y - f(x))(2x + 2)
$$

Now we can calculate the gradient of the loss function with respect to our parameter. Let's try to formulate this in Python:

```python showLineNumbers=true title="Approximation With One Function in Python"
def f(x):
    return x**2 + 2 * x + 1

def df_dx(x):
    return 2 * x + 2

x = 0
y = 144
epochs = 20

for i in range(epochs):
    mse = (y - f(x)) ** 2
    mse_derivative = 2 * (y - f(x)) * df_dx(x)
    x = x - (0.001 / (1 + i * 0.1)) * mse_derivative

print(f"x after 20 epochs: {x}")
```

We start with the value $x = 0$ and we loop for $20$ epochs to update our $x$ parameter according to the gradient we calculate. Our learning rate $\alpha = 0.001$. The structure of this program very much represents one of a simple machine learning program.

Let's test the program:

```sh
λ> python3 main.py
x after 20 epochs: 10.99970167370445
```

Seems like we're indeed reaching the proper solution. Let's plot the loss function:

<Image src="/images/posts/approximating-functions/loss.png" text="A plot of the loss function."/>

Looks good. We shall expand our method to solve any system with $m$ equations and $n$ unknowns.
