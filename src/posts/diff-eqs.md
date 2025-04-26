---
title: "Deriving Formulas for Differential Equations"
description: "Originally derived in Apostol's book. Found it cool so I wrote it down."
published: true
post: true
date: '2025-04-26'
slug: 'diff-eqs'
tags: ['math']
---

Originally derived in Tom Apostol's *Calculus, Volume 1*. Maybe I'll be writing other stuff here later as well.

### First-Order Homogeneous Differential Equations
We are given $y' + P(x) y = 0$.

We see that
$$
y' = -P(x)y \implies \frac{y'}{y} = -P(x).
$$

Notice that $\frac{y'}{y} = \frac{d}{dx} \ln(y)$. We now integrate on both sides:

$$
\ln(y) = - \int P(x) dx + C.
$$

Following from the definition of the logarithm, we have:
$$
y = e^{-\int P(x) dx + C} \quad \text{ or } \quad y = e^{-A(x)} \text{ where } A(x) = \int P(x) dx - C.
$$

To satisfy the *initial-value problem* of $f(a) = b$, we need to change the definition a bit. We have:
$$
y = be^{-A(x)},
$$
where  $A(x) = \int_a^x P(t) dt$. When $x = a$, we have:

$$
y = be^{-\int_a^a P(t)dt} = be^0 = b
$$
so the problem is satisfied. We shall now derive the formula for nonhomogeneous differential equations too. The homogeneous formulas serve as a good background for deriving the nonhomogeneous formulas.

### First-Order Nonhomogeneous Differential Equations

Let $y = g(x)$ be defined so that it satisfies the equation

$$
y' + P(x)y = Q(x) \quad \text{or} \quad g'(x) + P(x) g(x) = Q(x).
$$

Also define $h(x) = g(x) e^{A(x)}$, where $A(x) = \int_a^x P(t) dt$. From the product rule we have
$$
h'(x) = g'(x)e^{A(x)} + g(x)e^{A(x)} \cdot A'(x) = e^{A(x)}[g'(x) + P(x)g(x)],
$$
since $A'(x) = P(x)$. Notice from the originally given equation that
$$
g'(x) + P(x) g(x) = Q(x).
$$

We thus have $h'(x) = e^{A(x)}Q(x)$.

Notice that $h(a) = g(a)$ (because $h(a) = g(a)e^0$). From the second fundamental theorem of calculus we have
$$ 
h(x) = g(a) + \int_a^x e^{A(t)} Q(t) dt.
$$

We can now find the formula for $g(x)$:
$$
h(x) = g(x)e^{A(x)} \implies g(x) = \frac{h(x)}{e^{A(x)}} = h(x)e^{-A(x)}.
$$
$$
g(x) = g(a)e^{-A(x)} + e^{-A(x)} \int_a^x e^{A(t)} Q(t) dt
$$
where $A(x) = \int_a^x P(t) dt$.
