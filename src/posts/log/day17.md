---
title: "More Properties of Matrices - Day 17 of ML"
description: "Continuing with linear algebra: LU decomposition, matrix inverses, transposes and permutation."
published: true
date: '2024-06-24'
slug: 'day17'
tags: ['log', 'math', 'linalg']
post: true
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 4h<br /> **Total**: 45h/10000h

___

I'm reading through my linear algebra book and this is just a brief look over the various things I went over today.

## LU Decomposition

We briefly talked about **upper and lower triangular matrices** on [Day 10 of ML](https://vlimki.dev/writing/day10). Today we'll look a bit further into how they can be used to solve systems. We'll also be going over matrix inverses and transposes.

*NOTE: A prerequisite for reading this section would be having read Day 10 of ML, since that's where we go over the principles of the upper and lower triangular matrices.*

Following the principles of Day 10 of ML, we know that the lower triangular matrix $L$ is used for forward elimination, and the upper triangular matrix $U$ is used for back-substitution. With forward elimination, we go from $b$ to $c$, and with back-substitution we go from $c$ to $x$.

The system $Ax = b$ can be split into two different parts: $Lc = b$ and $Ux = c$. Knowing that $A = LU$, we can multiply the second equation with $L$ to get $LUx = Lc$, which is simply equivalent to $Ax = b$.

Elimination algorithms tend to do this. The algorithm can be broken into two steps:
1. factoring (finding $L$ and $U$ from $A$), and
2. solving (finding $x$ using $L$ and $U$).

## The Permutation Matrix P

What if you have a system of equations that looks something like this:
$$
\begin{bmatrix}
0 & 2 \\
3 & 4
\end{bmatrix}

\begin{bmatrix}
u \\
v 
\end{bmatrix} 
=
\begin{bmatrix}
b_1 \\
b_2 
\end{bmatrix} 
$$

We run into a problem. No multiple of row 1 can eliminate the element $a_{21}$ (3). We can remedy this by swapping rows 1 and 2 from the matrix, which gives us a normal-looking system again. To express this in matrix terms, we have the **permutation matrix** $P$ that swaps the rows. It looks like this:
$$
P = \begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix} \,\,\,\,
PA = \begin{bmatrix}
0 & 1 \\
1 & 0
\end{bmatrix}
\begin{bmatrix}
0 & 2 \\
3 & 4
\end{bmatrix} = 

\begin{bmatrix}
3 & 4 \\
0 & 2
\end{bmatrix}
$$

Note that we also have to swap the rows in $b$. The new system is $PAx = Pb$. For a matrix with $n$ rows, there are $n! = (n)(n-1)\dots(1)$ permutations.

## Inverses

The inverse for some matrix $A$ exists when there is a matrix $A^{-1}$ that contains the following property: $A^{-1}A = I$. If you multiply by $A$ first and then multiply by $A^{-1}$, you get back to where you started. The inverse of an $n \times n$ matrix is another $n \times n$ matrix.

Inverse matrices are useful for solving systems. If $A$ is invertible, the one and only solution to $Ax = b$ is $A^{-1}b$. Let's prove this by multiplying $Ax = b$ with $A^{-1}$:
$$
A^{-1}Ax = A^{-1}b \implies x = A^{-1}b
$$

Here are some things to note about inverses:
1. The inverse exists only for nonsingular matrices.
2. A matrix has only one inverse at most.
3. A $2 \times 2$ matrix is invertible only if it's determinant is not zero.
4. The inverse of a product of two invertible matrices $(AB)^{-1} = B^{-1}A^{-1}$. A similar rule is for $N$ invertible matrices. Consider a set of matrices $S = \{A_i\}_{i=1}^{N}$. The inverse of the product of all these matrices is:
$$
(\prod\limits_{i=1}^N{A_i})^{-1} = \prod\limits_{i=N}^1{A_i^{-1}}.
$$

### Calculating Inverses with the Gauss-Jordan Method

The Gauss-Jordan Method is a simple system for getting the inverse of some matrix $A$. Here are the steps on how it works:
1. Combine $A$ into one matrix with the identity matrix $I$ (also known as the **augmented matrix** $[A \vert I]$).
2. Solve the upper triangular form of $A$, so we end up with $[U \vert L^{-1}]$.
3. Create zeros above the pivots as well and divide each pivot to form the identity matrix. This results in $[I \vert U^{-1}L^{-1}] = [I | A^{-1}]$.

Let's see an example (ChatGPT-generated) for this. This will be the matrix for our example:
$$
A = \begin{bmatrix} 
1 & 2 & 1 \\ 
3 & 4 & 1 \\ 
1 & 2 & 2 
\end{bmatrix}
$$

We start with the augmented matrix $[A | I]$:
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 1 & 1 & 0 & 0 \\
3 & 4 & 1 & 0 & 1 & 0 \\
1 & 2 & 2 & 0 & 0 & 1 \\
\end{array}\right]
$$

Step 1: We first eliminate the entries below the first element in the first column.
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 1 & 1 & 0 & 0 \\
0 & -2 & -2 & -3 & 1 & 0 \\
0 & 0 & 1 & -1 & 0 & 1 \\
\end{array}\right]
$$

Step 2: Use the third row to make the third column above it zero.
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 0 & 2 & 0 & -1 \\
0 & -2 & 0 & -1 & 1 & 2 \\
0 & 0 & 1 & -1 & 0 & 1 \\
\end{array}\right]
$$

Step 3: Normalize the second row by multiplying by $\frac{1}{2}$.
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 0 & 2 & 0 & -1 \\
0 & 1 & 0 & 0.5 & -0.5 & -1 \\
0 & 0 & 1 & -1 & 0 & 1 \\
\end{array}\right]
$$

Step 4: Clear the second column in rows 1 and 3.
$$
\left[\begin{array}{ccc|ccc}
1 & 0 & 0 & 1 & 1 & 1 \\
0 & 1 & 0 & 0.5 & -0.5 & -1 \\
0 & 0 & 1 & -1 & 0 & 1 \\
\end{array}\right]
$$

The right side of the augmented matrix now represents the inverse of $A$:
$$
A^{-1} = \begin{bmatrix}
1 & 1 & 1 \\
0.5 & -0.5 & -1 \\
-1 & 0 & 1 \\
\end{bmatrix}
$$

## The Transpose Of a Matrix

Fortunately, this idea is much simpler than the inverse. The **transpose** $A^T$ of a matrix $A$ essentially just **swaps the columns and rows in the matrix**. Yes, it is as simple as it sounds. Take a look:

$$
\text{If   } A = \begin{bmatrix} 
1 & 2 & 3 \\ 
4 & 5 & 6 
\end{bmatrix}

\text{, then }
A^T = \begin{bmatrix}
1 & 4 \\
2 & 5 \\
3 & 6
\end{bmatrix}
$$

As with inverses, the product of matrix transposes follows a similar rule. The transpose of a product of two matrices $(AB)^{T} = B^{T}A^{T}$. 

Again, consider a set of matrices $S = \{A_i\}_{i=1}^{N}$. The transpose of the product of all these matrices is:
$$
(\prod\limits_{i=1}^N{A_i})^{T} = \prod\limits_{i=N}^1{A_i^{T}}.
$$

### Symmetric matrices

A **symmetric matrix** $A$ is one that possesses the following property: $A^T = A$. Here are some examples of symmetric matrices:

$$
A = \begin{bmatrix} 
1 & 3 \\
3 & 2 
\end{bmatrix},\,\,\,\,\,

B = \begin{bmatrix} 
2 & -1 & 4 \\
-1 & 3 & 5 \\
4 & 5 & 6
\end{bmatrix},\,\,\,\,\,

C = \begin{bmatrix}
7 & 0 & 0 \\
0 & 8 & 0 \\
0 & 0 & 9
\end{bmatrix}
$$

## Conclusion
That was that. Not sure what I'll be doing in the upcoming days. Perhaps I'll look into something like decision trees and just keep going with linear algebra. I really want to get into neural networks and stuff but I want to have a great linear algebra base before I do that.
