---
title: "Elementary Matrices - Day 10 of ML"
description: "A brief look into elementary matrices."
published: true
date: '2024-06-17'
slug: 'day10'
tags: ['journey', 'math', 'linalg']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 3h<br /> **Total**: 24h/10000h

Looks like I've spent my first 24h studying ML, nice.

___

I did a lot of math assignments regarding calculus and linear algebra. I didn't go over too many new things but instead worked on the things I had already learned.

There's a small topic I forgot to talk about in the post [two days ago](https://vlimki.dev/writing/day8): **elementary matrices** (also known as elimination matrices).

Elementary matrices effectively illustrate the principle of making row operations on matrices. Take this matrix $A$ as an example:
$$
A = \begin{bmatrix}2 & 2 & 4 \\ 4 & 5 & 7 \\ 6 & 4 & 3\end{bmatrix}
$$

What if we wanted to eliminate $a_{21}$ as the first elimination step to get the **upper triangular matrix $U$**?

Well, you can multiply $A$ with an elementary matrix $E_{21}$. Elementary matrices are derived from the identity matrix $I$, and their purpose is to do some slight adjustment to the matrix with row operations. Let's see how this would go for our example.

So, we need to subtract $2 \cdot R1$ from $R2$ to eliminate the element at $a_{21}$. Let's first define the elementary matrix $E_{21}$:

$$
E_{21} = \begin{bmatrix}1 & 0 & 0 \\ -2 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix}
$$

Notice that it indeed looks very similar to the identity matrix. The only purpose of this matrix is to just do the row operation. Let's see how this is done with matrix multiplication:
$$
\begin{bmatrix}2 & 2 & 4 \\ 4 & 5 & 7 \\ 6 & 4 & 3\end{bmatrix} \begin{bmatrix}1 & 0 & 0 \\ -2 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix} = \begin{bmatrix}2 & 2 & 4 \\ 0 & 1 & -1 \\ 6 & 4 & 3 \end{bmatrix}
$$

To get the upper triangular matrix, we also need to eliminate the elements $a_{31}$ and $a_{32}$. Let's first define the elementary matrices for those operations:

$$
E_{31} = \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ -3 & 0 & 1\end{bmatrix},\,\,\,\,\, E_{32} = \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 2 & 1\end{bmatrix}
$$

$$
U = E_{21}E_{31}E_{32}A = \begin{bmatrix}1 & 0 & 0 \\ -2 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix} \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ -3 & 0 & 1\end{bmatrix} \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 2 & 1\end{bmatrix} \begin{bmatrix}2 & 2 & 4 \\ 4 & 5 & 7 \\ 6 & 4 & 3\end{bmatrix} = \begin{bmatrix}2 & 2 & 4 \\ 0 & 1 & -1 \\ 0 & 0 & -11\end{bmatrix}
$$

There we go. Note that the expression $E_{21}E_{31}E_{32}$ evaluates to the **lower triangular matrix $L$**:
$$
L = E_{21}E_{31}E_{32} = \begin{bmatrix}1 & 0 & 0 \\ -2 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix} \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ -3 & 0 & 1\end{bmatrix} \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 2 & 1\end{bmatrix} = \begin{bmatrix}1 & 0 & 0 \\ -2 & 1 & 0 \\ -3 & 2 & 1\end{bmatrix}
$$
