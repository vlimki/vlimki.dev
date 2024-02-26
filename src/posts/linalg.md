---
title: 'Vector Angles and Orthogonality'
description: "More mathematics testing."
date: '2024-02-26'
published: false
tags: ["linear-algebra", "math"]
---

<script>
    import FooterText from '$lib/components/FooterText.svelte';
</script>

The concepts of angle and orthogonality are also related to geometrical vectors. We saw that inner products allow for the definition of length and distance. In the same manner, inner products are used to define **angles** and **orthogonality**.

In machine learning, the **angle** between a pair of vectors is used as a **measure of vector similarity**. To understand angles let’s first look at the **Cauchy–Schwarz inequality**. Consider a pair of non-zero vectors $\bf{x}$ and $\bf{y}$ $\in \mathbb{R}^n$. The Cauchy–Schwarz inequality states that:

$$
\vert \langle x, y \rangle \vert \leq \Vert x \Vert \Vert y \Vert
$$

In words: _the absolute value of the inner product of a pair of vectors is less than or equal to the products of their length_. The only case where both sides of the expression are _equal_ is when vectors are colinear, for instance, when $\bf{x}$ is a scaled version of $\bf{y}$. In the 2-dimensional case, such vectors would lie along the same line.

The definition of the angle between vectors can be thought as a generalization of the **law of cosines** in trigonometry, which defines for a triangle with sides $a$, $b$, and $c$, and an angle $\theta$ are related as:

$$
c^2 = a^2 + b^2 - 2ab \cos \theta
$$

### Law of cosines and Angle between vectors

We can replace this expression with vectors lengths as:

$$
\Vert x - y \Vert^2 = \Vert x \Vert^2 + \Vert y \Vert^2 - 2(\Vert x \Vert \Vert y \Vert) \cos \theta
$$

With a bit of algebraic manipulation, we can clear the previous equation to:


```python
x, y = np.array([[1], [2]]), np.array([[5], [7]])

# here we translate the cos(theta) definition
cos_theta = (x.T @ y) / (np.linalg.norm(x,2) * np.linalg.norm(y,2))
print(f'cos of the angle = {np.round(cos_theta, 3)}')
```
```
cos of the angle = [[0.988]]
```
    

We get that $\cos \theta \approx 0.988$. Finally, to know the exact value of $\theta$ we need to take the trigonometric inverse of the cosine function as:

```python
cos_inverse = np.arccos(cos_theta)
print(f'angle in radiants = {np.round(cos_inverse, 3)}')
```
```
angle in radiants = [[0.157]]
```  

We obtain $\theta \approx 0.157$. To fo from radiants to degrees we can use the following formula:

```python
degrees = cos_inverse * ((180)/np.pi)
print(f'angle in degrees = {np.round(degrees, 3)}')
```
```
angle in degrees = [[8.973]]
```    

**Orthogonality** is often used interchangeably with “independence” although they are mathematically different concepts. Orthogonality can be seen as a generalization of perpendicularity to vectors in any number of dimensions.

We say that a pair of vectors $\bf{x}$ and $\bf{y}$ are **orthogonal** if their inner product is zero, $\langle x,y \rangle = 0$. The notation for a pair of orthogonal vectors is $\bf{x} \perp \bf{y}$. In the 2-dimensional plane, this equals to a pair of vectors forming a $90^{\circ}$ angle.

## Matrix-matrix multiplication

We define $\mathbf{A} \in \mathbb{R^{n\times p}} \cdot \mathbf{B} \in \mathbb{R^{n\times p}} = \mathbf{C} \in \mathbb{R^{m\times p}}$:

$$
\mathbf{A}\cdot\mathbf{B}:= \begin{bmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \cdots & a_{mn} \end{bmatrix} \begin{bmatrix} b_{11} & \cdots & b_{1p} \\ \vdots & \ddots & \vdots \\ b_{n1} & \cdots & b_{np} \end{bmatrix}
$$

A compact way to define the matrix-matrix product is:

$c_{ij} := \sum\limits_{l=1}^{n} a_{il}b_{lj}$, where $i=1,...,m$, and, $j=1,...,p$

For instance:

$$
\mathbf{A}\cdot\mathbf{B}= \begin{bmatrix} 0 & 2 \\ 1 & 4 \end{bmatrix} \begin{bmatrix} 1 & 3 \\ 2 & 1 \end{bmatrix}= \begin{bmatrix} 1\times0 + 2\times2 & 3\times0 + 1\times2 \\  1\times1 + 2\times4 & 3\times1 + 1\times4 \end{bmatrix}= \begin{bmatrix} 4 & 2 9 & 7 \end{bmatrix}
$$

Matrix-matrix multiplication has a series of important properties:

* Associativity: $(\mathbf{A}\mathbf{B}) \mathbf{C} = \mathbf{A}(\mathbf{B}\mathbf{C})$
* Associativity with scalar multiplication: $\alpha (\mathbf{A}\mathbf{B}) = (\alpha \mathbf{A}) \mathbf{B}$
* Distributivity with addition: $\mathbf{A}(\mathbf{B}+\mathbf{C}) = \mathbf{A}+\mathbf{B} + \mathbf{AC}$
* Transpose of product: $(\mathbf{A}\mathbf{B})^T = \mathbf{B}^T\mathbf{A}^T$

