---
title: "Integrals & Riemann sums - Day 2 of ML"
description: "Looking into integrals and Riemann sums."
published: true
date: '2024-06-09'
post: true
slug: 'day2'
tags: ['log', 'math', 'calculus']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 4h <br /> **Total**: 9.5h/10000h

Integrals are probably going to be the last thing I'll cover in calculus in a while. I will probably come back to look into partial derivatives at some point.
___


The integral is a great tool for calculating areas. It is also defined as a limit, just like its' counterpart - the derivative. Before looking into the formal definition, let's first ask a question: how can one calculate the area under a curve of a function?

Now, the answer to this question is actually a bit trickier. There really is no good way to calculate the exact area; one can really just approximate it. Here's an approach on how one might do so.

Consider the function $f(x) = 1 - x^2$ over the interval $[0, 1]$. It looks like this:

<Image src="/images/posts/day2/fx.png" text="Graphic of f(x). (Source: ChatGPT/matplotlib)" />

The way to approximate the area would be to draw rectangles under the curve. The rectangles would be of height $f(x)$ and of a width that can be decided based on $n$, the number of rectangles we want to draw. Let's try this with $n=4$:

<Image src="/images/posts/day2/fx-rectangles-1.png" text="Graphic of f(x) with 4 rectangles approximating the area. (Source: ChatGPT/matplotlib)" />


Ugh. Seems like quite a rough approximation, doesn't it? It does overshoot quite a bit. This is called the **upper sum** of $f(x)$. The upper sum uses the point of the maximum value of $f(x)$ in the subinterval the rectangle forms.

Here the width of the rectangles is 1/4. Let's consider that as $w$. The calculation for the sum would simply be 
$$
    A \approx 1 \cdot w + \frac{15}{16} \cdot w + \frac{3}{4} \cdot w + \frac{7}{16} \cdot w = 0.78125
$$

What if one used the point of the minimum value of $f(x)$ in the rectangle (also known as the partition P)'s subinterval? That's when you get what's called a **lower sum**. Here's a graphical illustration of that too:

<Image src="/images/posts/day2/fx-rectangles-lower.png" text="Graphic of f(x) with 4 rectangles approximating the lower sum. (Source: ChatGPT/matplotlib)" />

Now the calculation would go like this:

$$
A \approx \frac{15}{16} \cdot w + \frac{3}{4} \cdot w + \frac{7}{16} \cdot w + 0 \cdot w = 0.53125
$$

Another way of approximating the area is what's called the **midpoint rule**. The midpoint rule uses the midpoint of each rectangle, as opposed to the maximum or the minimum value. The area approximation given by the midpoint rule is always between the lower and the upper sums. See:

<Image src="/images/posts/day2/fx-rectangles-midpoint.png" text="Graphic of f(x) with 4 rectangles approximating the midpoint sum. (Source: ChatGPT/matplotlib)" />

The midpoint approximation is often the most precise. The calculation follows the same principle:

$$
A \approx \frac{63}{64} \cdot w + \frac{55}{64} \cdot w + \frac{39}{64} \cdot w + \frac{15}{64} \cdot w = 0.671875
$$

The precision of all of these approximations will improve as the amount of rectangles ($n$) increases. Let's try $n=10$ instead:

<Image src="/images/posts/day2/fx-rectangles-2.png" text="Graphic of f(x) with 10 rectangles approximating the upper sum. (Source: ChatGPT/matplotlib)" />

That's better. The approximation is still a bit rough though. But that's fine. This is only to illustrate the principle. Let's try doing this in Python to save the job of calculating these manually.

```python
import numpy as np

def f(x):
    return 1 - x ** 2

lower_bound = 0
upper_bound = 1

# n = amount of rectangles
def lower_sum(n):
    rectangle_width = (upper_bound - lower_bound) / n

    S = 0

    for i in range(n):
        # all the x values in the rectangle (also known as the partition P)
        x_i = np.linspace(i * rectangle_width, (i + 1) * rectangle_width)

        # the lowest value of f(x) in x_i
        m_i = np.min(f(x_i))

        S += m_i * rectangle_width

    return S

def upper_sum(n):
    rectangle_width = (upper_bound - lower_bound) / n

    S = 0

    for i in range(n):
        # all the x values in the rectangle (also known as the partition P)
        x_i = np.linspace(i * rectangle_width, (i + 1) * rectangle_width)

        # the highest value of f(x) in x_i
        m_i = np.max(f(x_i))

        S += m_i * rectangle_width

    return S

def midpoint_sum(n):
    rectangle_width = (upper_bound - lower_bound) / n

    S = 0

    for i in range(n):
        x_i = (i * rectangle_width + (i + 1) * rectangle_width) / 2

        # the highest value of f(x) in x_i
        m_i = np.max(f(x_i))

        S += m_i * rectangle_width

    return S

```

Testing these functions with $n=4$ should yield the same results.

```python
> print(lower_sum(4))
0.53125

> print(upper_sum(4))
0.78125

> print(midpoint_sum(4))
0.671875
```

Nice! Let's make a table of the approximations the program gives when $n$ goes up.

| $n$      | lower_sum      | midpoint_sum      | upper_sum |
| ------------- | ------------- | ------------- | ------------- |
| 4             | 0.53125 | 0.67125 | 0.78125  |
| 25            | 0.6464 | 0.6668000000000001 | 0.6864 |
| 50            | 0.6565999999999999 | 0.6667 | 0.6765999999999999 |
| 100            | 0.6616500000000002 | 0.6666749999999999 | 0.6667166649999995 |

Seems like the values are all approaching $\frac{2}{3}$. If $n=\infty$, all of the values would equal exactly that.

What we saw is called the **Riemann sum $S_P$ on the interval $[a, b]$**. It is formally defined as:
$$
S_P = \sum\limits_{i=1}^{n}{f(x_i^{*}) \Delta x}
$$

where $P$, the partition, is the set of some points on the interval $[a, b]$.

## Definite Integrals

We can extend the Riemann sum a bit - the **Riemann integral** is formally defined as the limit:
$$
\int_{a}^{b}{f(x)\,dx} = \lim\limits_{n \to \infty}{\sum\limits_{i=1}^{n}{f(x^{*}_{i}) \Delta x}}.
$$

Where:
1. $\int_{a}^{b}{f(x)\,dx}$ is the notation for a **definite integral**.
2. $\Delta x$ is the width of the subinterval (the rectangle).
3. $x_{i}^{*}$ is some point on the graph of $f$.

However, calculating the values of definite integrals is a bit inconvenient using the Riemann sums. Another approach is to use **antiderivatives**. The antiderivative $F$ of a function $f$ is defined when $F'(x) = f(x)$.

The Fundamental Theorem of Calculus states that if $f$ is continuous on the interval $[a, b]$, and $F$ is any antiderivative of $f$ on $[a, b]$, then

$$
\int_{a}^{b}{f(x)\,dx} = F(b) - F(a).
$$

This gives us a method to solve definite integrals without having to calculate the limits of Riemann sums. We only need to:
1. Find an antiderivative $F$ of $f$, and
2. Calculate the value $F(b) - F(a)$.

When solving antiderivatives, you just have to think backwards.

**Example 1**: Evaluate $\int_{1}^{4}{(\frac{3}{2} \sqrt{x} - \frac{4}{x^2}) dx}$. <br/>**Solution**:
1. For what value is $\frac{3}{2} \sqrt{x}$ the derivative? It can be rewritten as $\frac{3}{2} x^{\frac{1}{2}}$, and we know from the power rule ($\frac{d}{dx} x^n = n x^{n-1}$) that the antiderivative must be $x^{\frac{3}{2}}$.
2. For what value is -$\frac{4}{x^2}$ the derivative? We know that $\frac{d}{dx} \frac{1}{x} = -\frac{1}{x^2}$, so the antiderivative must be $\frac{4}{x}$.
3. So we have the antiderivative, which is $x^{\frac{3}{2}} + \frac{4}{x}$. We need to evaluate it at $x = 4$ and $x = 1$ to find the definite integral.

$$
\int_a^{b} f(x) \, dx = \left[ F(x) \right]_1^{4} = (4^{\frac{3}{2}} + \frac{4}{4}) - (1^{\frac{3}{2}} + \frac{4}{1}) = (8 + 1) - (1 + 4) = 4
$$

Cool! Let's try evaluating the definite integral we were looking at before.

**Example 2**: Evaluate $\int_{0}^{1}{(1 - x^2)\,dx}$. <br/>
**Solution**: The antiderivative of $f$ is $F(x) = (x - \frac{x^3}{3})$.

$$
\int_{0}^{1}{(1 - x^2)\,dx} = \left[ x - \frac{x^3}{3} \right]_0^{1} = (1 - \frac{1}{3}) - (0 - \frac{0^3}{3}) = \frac{2}{3}
$$

Looks like our approximations were correct.

## Indefinite Integrals & Solving by Substitution

The **indefinite integral** is defined as the **set of all antiderivatives of $f$**. Since antiderivatives only differ by a constant C, for any antiderivative $F$ we have:

$$
\int{f(x) \, dx} = F(x) + C
$$

### Substitution Method
The substitution method is also just about thinking backwards. For example, we know from the chain rule that $\frac{d}{dx} \frac{u^{n+1}}{n + 1}$ is $u^n \frac{du}{dx}$. We can look at it from another perspective and say that $\int{u^n\,du} = \frac{u^{n+1}}{n+1}$.

**Example 1**: Find $\int{\sqrt{2x + 1}\,dx}$ <br/>
**Solution**:
1. Consider $u = \sqrt{2x + 1}$. Let's rewrite the integral as $\int{(2x + 1)^{\frac{1}{2}}\,dx}$. This integral does not fit the formula $\int{u^n \,du}$, (since $du = 2$) so let's rewrite more.
2. Rewrite the integral as $\frac{1}{2} \int{(2x + 1)^{\frac{1}{2}}\cdot 2 \, dx}$.
3. Now we have $\frac{1}{2} \int{u^{1/2}\,du}$. Integrate that and get $\frac{1}{2} \frac{u^{3/2}}{3/2}$.
4. Substitute for $u$ and get $\frac{(2x + 1)^{3/2}}{3} + C$.

___

That's enough for integrals. I used [Thomas' Calculus, Early Transcendentals - 15th edition](https://www.amazon.com/Thomas-Calculus-Early-Transcendentals-Units/dp/1292725907/) as my resource for studying. Most definitely gonna also check out other resources like 3Blue1Brown when I need to gain a deeper understanding.

I found some exercises for (indefinite) integrals [here](https://www.newcastle.edu.au/__data/assets/pdf_file/0006/819186/Indefinite-integral-exercises.pdf).
