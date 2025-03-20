---
title: "Notes on Shilov's Linear Algebra"
description: 'Personal notes converted from LaTeX.'
published: true
post: true
date: '2025-03-17'
slug: 'notes-shilov'
tags: ['math']
---

NOTE: These notes were converted from $\LaTeX$ to markdown algorithmically and may thus contain some notation errors. And obviously some errors may be present regardless because, well, they're my notes :)

# Determinants

## Number Fields

A number field is any set $K$ of objects for which the arithmetic
operations give again, elements of $K$. The operations have the
following axioms:

1.  For every pair of numbers $\alpha$ and $\beta$ in $k$ there
    corresponds a single number $\alpha + \beta$ in $K$, the sum of
    $\alpha$ and $\beta$.

    1.  $\alpha + \beta = \beta + \alpha$ for all $\alpha,\beta \in K$.

    2.  $(\alpha + \beta) + \gamma = \alpha + (\beta + \gamma)$ for
        every $\alpha, \beta, \gamma \in K$.

    3.  There exists a number $0$ such that
        $0 + \alpha = \alpha, \alpha \in K$.

    4.  For every $\alpha$ in $K$ there exists a number (negative
        element) $\gamma$ in $K$ such that
        $\alpha + \gamma = 0 \implies a = -\gamma$. We get subtraction
        by defining the difference $\beta - \alpha$ as $\beta + \gamma$.

2.  For every pair of numbers $\alpha, \beta \in K$ there exists a
    unique number $\alpha \cdot \beta$ in $K$, called the product of
    $\alpha$ and $\beta$:

    1.  $\alpha \beta = \beta \alpha$

    2.  $(\alpha \beta) \gamma = \alpha (\beta \gamma)$

    3.  There exists a number $1$ such that $1 \cdot \alpha = \alpha$
        for all $\alpha \in K$.

    4.  $\alpha(\beta + \gamma) = \alpha \beta + \alpha \gamma$

    5.  For all $\alpha$ there exists a number $\gamma$ such that
        $\alpha \gamma = 1 \implies \gamma = \frac{1}{\alpha}$. We
        define the quotient $\frac{\beta}{\alpha}$ as
        $\beta \cdot \gamma$.

3.  We define the natural numbers, $\mathbb{N}$, as the numbers
    $1, 2, 3, ...$. We define the integers $\mathbb{Z}$ as the natural
    numbers, their negative counterparts and $0$. We define the rational
    numbers in a field $K$ as the set of all quotients $\frac{p}{q}$,
    where $p,q \in Z, q \neq 0$.

4.  Examples of number fields:

    1.  The field of rational numbers. Note that integers do not form a
        number field, for they do not satisfy axiom 2(e).

    2.  The field of real numbers $\mathbb{R}$.

    3.  The field of complex numbers $\mathbb{C}$ of the form $a + ib$,
        where $a,b \in R$. We have
        $(a_1 + ib_1) + (a_2 + ib_2) = (a_1 + a_2) + i(b_1 + b_2)$.
        $a + i 0 = a$.

## Systems of Linear Equations

In the most general case, such a system has the form 
$$
\begin{gathered}
    a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1, \\
    a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2, \\
    \vdots \\
    a_{k1}x_1 + a_{k2}x_2 + \dots + a_{kn}x_n = b_k,\end{gathered}
$$

where $x_1, x_2, \dots, x_n$ are the **unknowns**,
$a_{11}, a_{12}, \dots, a_{kn}$ are the **coefficients** and
$b_1, b_2, \dots, b_n$ are constants. The first index of a coefficient
indicates the number of the equation in which the coefficient appears,
and the second index indicates the index of the unknown variable.

A **solution** to the system means any set of numbers
$c_1, c_2, \dots, c_n \in K$ which, when substituted for the unknowns
reduces every equation into an identity. A system with at least one
solution is called compatible. If a sytem has a unique solution, it is
called determinate. If it has at least two solution, it is called
indeterminate. The basic problems of studying a system are:

1.  Whether the ystem is compatible or incompatible;

2.  If the system is compatible, to find whether it is determinate or
    indeterminate;

3.  If the system is determinate, to find the solution;

4.  If the system is indeterminate, to describe the set of all
    solutions.

## Determinants

### Introduction

Suppose we have a square matrix (an array of $n^2$ numbers
$a_{ij} \in K$ ($i,  = 1, 2, \dots, n$):


$$
\begin{bmatrix}
        a_{11} & a_{12} & \dots & a_{1n} \\
        a_{21} & a_{22} & \dots & a_{2n} \\
        \vdots & \vdots & \vdots & \vdots \\
        a_{n1} & a_{n2} & \dots & a_{nn} \\
    \end{bmatrix}
$$


The number of rows and columns of the matrix is called its **order**.
Every $a_{ij}$ is called an element of the matrix. The first index
indicates the row and the second index the column of $a_{ij}$. The
elements $a_{11}, a_{22}, \dots, a_{nn}$ indicate the **principal
diagonal** of the matrix.

### The Terms of the Determinant

A **term of the determinant** of the matrix is a product of $n$ elements
that contains *just one element from each row and each column*:


$$
a_{{\alpha_1}1} a_{{\alpha_2}2} \dots a_{{\alpha_n}n}
$$
 Note that the
factors of the term go from \"left to right\" (i.e. they are ordered by
columns, not by rows). The first element is in the first column and some
row $\alpha_1$, the second element is in the second column and some row
$\alpha_2$, etc. The numbers $\alpha_1, \alpha_2, \dots, \alpha_n$ are
all different and represent some permutation of the numbers
$1, 2, \dots, n$. By an **inversion** in the sequence
$\alpha_1, \alpha_2, \dots, \alpha_n$ we mean an arrangement of two
indices such that the larger index come before the small index. We
denote the total number of inversions with
$N(\alpha_1, \alpha_2, \dots, \alpha_n)$. For example, in the
permutation $2, 1, 4, 3$ there are two inversion ($2 > 1$ and $4 > 3$),
so $N(2, 1, 4, 3) = 2$. In the permutation $4, 3, 1, 2$ there are five
inversion ($4 > 1$, $3 > 1$, $4 > 2$, $3 > 2$, $4 > 3$), so
$N(4, 3, 1, 2) = 4$

If the number of inversions is even, we put a plus sign before the term;
if the number is odd, we put a minus sign. In other words, in front of
every term we put the expression

$$
(-1)^{N(\alpha_1, \alpha_2, \dots, \alpha_n)}
$$


The total number of the terms in the determinant is always equal to the
total number of permutations of $1, 2, \dots, n$, so $n!$.

### The Determinant

The determinant $D$ of a matrix is defined as the algebraic sum of the
$n!$ terms of the determinant:

$$
D = \sum (-1)^{N(\alpha_1, \alpha_2, \dots, \alpha_n)} a_{{\alpha_1}1} a_{{\alpha_2}2} \dots a_{{\alpha_n}n}
$$

Note that all of the terms of the determinant are exclusive, as in, they
do not contain the same terms, nor do they contain any more than one
element from each column. We denote the determinant D by one of the
following symbols:


$$
D = \begin{vmatrix}
        a_{11} & a_{12} & \dots & a_{1n} \\
        a_{21} & a_{22} & \dots & a_{2n} \\
        \vdots & \vdots & \vdots & \vdots \\
        a_{n1} & a_{n2} & \dots & a_{nn} \\
    \end{vmatrix} = \det \, ||a_{ij}||
$$
 For example, we get the
following expressions from the determinants of orders $2$ and $3$:

$$
\begin{vmatrix}
        a_{11} & a_{12} \\
        a_{21} & a_{22} \\
    \end{vmatrix} = a_{11}a_{22} - a_{21}a_{12}
$$



$$
\begin{vmatrix}
        a_{11} & a_{12} & a_{13} \\
        a_{21} & a_{22} & a_{23} \\
        a_{31} & a_{32} & a_{33} \\
    \end{vmatrix} = 
\begin{aligned}
    a_{11}a_{22}a_{33} - a_{21} a_{12} a_{33} + a_{31} a_{22} a_{13} + \\
    a_{21} a_{32} a_{13} - a_{21} a_{32} a_{13} - a_{11} a_{32} a_{23}
\end{aligned}
$$


We can determine the sign of a term of a determinant more intuitively
through geometric terms: There are only two ways two elements of a term
can relate to each other. You can draw a line between the two, and if
the line is going down the slope (not to be confused with the geometric
slope; it is actually the exact opposite) is positive and if the line is
going up, the slope is negative. We draw all the segments with a
negative slope (going upwards) that join pairs of elements in
$a_{{\alpha_1}1}, a_{{\alpha_2}2}, \dots, a_{{\alpha_n}n}$. We put a
plus sign before the term if the number of all of those segments is
even, and minus sign if it is odd. So again, we're just calculating the
number of inversions here.

### Determinants in Solving Systems

Consider a system of two unknowns: 
$$
\begin{aligned}
        a_{11}x_1 + a_{12} x_2 = b_1 \\
        a_{21}x_1 + a_{22} x_2 = b_2
    \end{aligned}
$$

$$
x_1 = \frac{b_1 a_{22} - b_2 a_{12}}{a_{11}a_{22} - a_{21}a_{12}} = \frac{\begin{vmatrix} b_1 & a_{12} \\ b_2 & a_{22} \end{vmatrix}}{\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix}}, \,\,\,\,
    x_2 = \frac{a_{11}b_2 - a_{21}b_1}{a_{11}a_{22} - a_{21}a_{12}} = \frac{\begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix}}{\begin{vmatrix} a_{11} & b_1 \\ a_{21} & b_2 \end{vmatrix}}
$$


### Properties of Determinants

1.  **The transposition operation.** We interchange the rows and columns
    of the determinant, to get the transpose of it. The tranpose has the
    same value as the original determinant. $D^T = D$, that is. From
    this we know the equivalence of the rows and columns of a
    determinant. 
$$
\begin{vmatrix}
                    a_{11} & a_{12} & \dots & a_{1n} \\
                    a_{21} & a_{22} & \dots & a_{2n} \\
                    \vdots & \vdots & \vdots & \vdots \\
                    a_{n1} & a_{n2} & \dots & a_{nn} \\
                \end{vmatrix}^T = 
                \begin{vmatrix}
                    a_{11} & a_{21} & \dots & a_{n1} \\
                    a_{12} & a_{22} & \dots & a_{n2} \\
                    \vdots & \vdots & \vdots & \vdots \\
                    a_{1n} & a_{2n} & \dots & a_{nn} \\
                \end{vmatrix}
$$


2.  **The antisymmetry property.** A determinant changes sign when two
    of its columns are interchanged. Say we change the columns $j$ and
    $j+1$. If a term initially had a positive slope connecting some
    elements from columns $j$ and $j+1$, that slope is now negative.
    This means that we get the same terms in the determinant but the
    sign changes. If we change two nonadjacent columns $j, k$ with $m$
    columns inbetween. We get a total of $2m + 1$ adjacent column
    interchanges, which means that the sign flips.

3.  *A determinant with two identical columns vanishes.* Interchanging
    the columns would not change $D$. But as was proven, a column change
    always changes the sign of the determinant. We have
    $D = -D \implies D = 0$.

4.  **The linear property.** If all the elements of a column $j$ can be
    expressed as linear combinations of two columns, i.e.:
    
$$
a_{ij} = \lambda b_i + \mu c_i \text{ for } i = 1,2,\dots,n
$$
 for
    some $\lambda$ and $\mu$, we have 
$$
D = \lambda D_1 + \mu D_2
$$

    where $D_1$ and $D_2$ are identical to $D$, just that the $j$th
    column of $D_1$ consists of elements $b_i$ and the $j$th column of
    $D_2$ consists of elements $c_i$. We can extend this to the general
    case where $a_ij = \lambda b_I + \mu c_i + \dots + \tau f_i$.

5.  *Any common factor of a column can be factored out of a
    determinant*. If we have $a_ij = \lambda b_i$, then by the linear
    property we have
    $D_j(a_{ij}) = D_j(\lambda b_i) = \lambda D_j(b_i)$. If a column
    consists entirely of zeros, the determinant vanishes, because we
    have $D_j(0) = D_j(0 \cdot 1) = 0 \cdot D_j(1) = 0$.

6.  *The value of a determinant does not change by adding the elements
    of one column multipliede by $\lambda$ to the elements of another
    column.* We have $D_j(a_{ij} + \lambda a_{ik})$ for columns $j,k$
    and $i = 1, 2, \dots, n$. We get:
    
$$
D_j(a_{ij} + \lambda a_{ik}) = D_j(a_{ij}) + \lambda D_j(a_{ik})
$$

    We notice that $D_j(a_{ik})$ now has two columns with elements
    $a_{ik}$, so we get
    
$$
D_j(a_{ij}) + \lambda D_j(a_{ik}) = D_j(a_{ij}).
$$


### Cofactors and Minors

The **cofactor** of the element $a_{ij}$ in a determinant is defined in
the following way: Consider the equation

$$
D = \sum (-1)^{N(\alpha_1,\alpha_2, \dots, \alpha_n)} a_{{\alpha_1}1} a_{{\alpha_2}2} \dots a_{{\alpha_n}n}
$$

take all the terms that contain the element $a_ij$ on the right-hand
side, and sum them up. Then factor out $a_{ij}$. What we're left with is
the cofactor of $a_{ij}$, $A_{ij}$. Since every term contains an element
from column $j$, we have

$$
D = a_{1j} A_{1j} + a_{2j} A_{2j} + \dots + a_{nj} A_{nj} = \sum\limits_{k=1}^n a_{kj} A_{kj}
$$

This is called the expansion of $D$ w.r.t the $j$th column. We can write
a similar expansion for rows as well.

If we delete a row and a column from a matrix of order $n$, we get a
matrix of order $n-1$. The determinant of this matrix is called a minor
of the original matrix. If we delete the $i$th row and the $j$th column
of $D$, we get the minor $M_{ij}(D)$. We have

$$
A_{ij} = (-1)^{i+j} M_{ij}
$$
 because from the sum of all the terms of
$D$ containing $a_{11}$, but with $a_{11}$ removed, we get $M_{11}$.
Since the determinant is a sum of signed products of elements from
different rows and columns, we can write: 
$$
\begin{aligned}
        D =a_{11}(\text{sum of all valid products from remaining (n-1)×(n-1) matrix}) \\
        + (\text{terms without $a_{11}$})
\end{aligned}
$$
 The sum of all valid products from the remaining
$(n-1) \times (n-1)$ matrix is exactly the determinant of that smaller matrix,
which is the minor $M_{11}$. So, we get:

$$
\sum(\text{terms containing } a_{11})=a_{11}M_{11} = a_{11}A_{11} \implies A_{11} = M_{11}
$$

For arbitrary $i,j$, we simply do $i - 1 + j - 1 = i + j - 2$ adjacent
interchanges between rows and columns (which all change the sign) to
move $a_{ij}$ to the $(1, 1)$ position. So we thus have

$$
A_{ij} = (-1)^{i+j - 2}M_{ij} = (-1)^{i+j}M_{ij}
$$
 Examples:

1.  An $n$th-order determinant of the form 
$$
D_n = \begin{vmatrix}
                    a_{11} & 0 & 0 & \dots & 0 \\
                    a_{21} & a_{22} & 0 & \dots & 0 \\
                    a_{31} & a_{32} & a_{33} & \dots & 0 \\
                    \vdots & \vdots & \vdots & \vdots & \vdots \\
                    a_{n1} & a_{n2} & a_{n3} & \dots & a_{nn} \\
                \end{vmatrix}
$$
 is called triangular. We see that $D_n$
    equals $a_{11}$ times a triangular determinant of order $n-1$. We
    again expand $D_{n-1}$ to get that $D_{n-1}  = a_{22}D_{n-2}$.
    Continuing this process we see that
    $D_n = \prod\limits_{k=1}^n a_{kk}$

2.  *The Vandermonde determinant.* 
$$
W(x_1, \dots, x_n) = 
                 \begin{vmatrix}
                    1 & 1 & \dots & 1 \\
                    x_1 & x_2 & \dots & x_n \\
                    x_1^2 & x_2^2 & \dots & x_n^2 \\
                    \vdots & \vdots & \vdots & \vdots \\
                    x_{1}^{n-1} & x_{2}^{n-1} & \dots & x_n^{n-1} \\
                \end{vmatrix}
$$
 We can treat $W(x_1, \dots, x_n)$ as a
    polynomial of degree $n-1$ in $x_n$. The polynomial vanishes if
    $x_n$ takes any of the values $x_1, x_2, \dots, x_{n-1}$, since it'd
    have two identical columns. We know from this that the polynomial is
    divisible by the product
    $(x_n - x_1) \cdots (x_n - x_{n-1}) = \prod\limits_{k=1}^{n-1}(x_n - x_k)$.
    We thus have
    
$$
W(x_1, \dots, x_n) = a(x_1, \dots, x_{n-1}) \prod\limits_{k=1}^{n-1}(x_n - x_k)
$$

    where $a(x_1, \dots, x_{n-1})$ is the leading coefficient. If we
    expand the determinant by the last column, we see the leading
    coefficient is just $W(x_1, \dots, x_{n-1})$ (because we get the
    exact same determinant, just without the last column and row). From
    this we get 
$$
\begin{aligned}
                    W(x_1, \dots, x_n) =& W(x_1, \dots, x_{n-1}) \prod\limits_{k=1}^{n-1}(x_n - x_k) \\
                    W(x_1, \dots, x_{n-1}) =& W(x_1, \dots, x_{n-2}) \prod\limits_{j=1}^{n-1}(x_{n-1} - x_j) \\
                                           &\vdots \\
                    W(x_1, x_2) =& W(x_1)(x_2 - x_1) \\
                    W(x_1) =& 1
                \end{aligned}
$$
 If we multiply all of these equations
    together, we get
    
$$
W(x_1, \dots, x_n) = \prod\limits_{1 \leqslant i < m \leqslant n} (x_m - x_i),
$$

    considering $x_1, \dots, x_n$ are all distinct.

### Practical Evaluation of Determinants

We begin by assuming that $c_1, c_2, \ldots, c_n$ is a solution of (17),
so that 
$$
\begin{gathered}
        a_{11}c_1 + a_{12}c_2 + \cdots + a_{1n}c_n = b_1, \\
        a_{21}c_1 + a_{22}c_2 + \cdots + a_{2n}c_n = b_2, \\
        \cdots \\
        a_{n1}c_1 + a_{n2}c_2 + \cdots + a_{nn}c_n = b_n.
    \end{gathered}
$$


We multiply the first of the equations (18) by the cofactor $A_{11}$ of
the element $a_{11}$ in the coefficient matrix, then we multiply the
second equation by $A_{21}$, the third by $A_{31}$, and so on, and
finally the last equation by $A_{n1}$. Then we add all the equations so
obtained. The result is 
$$
\begin{split}
        &(a_{11}A_{11} + a_{21}A_{21} + \cdots + a_{n1}A_{n1})c_1 \\
        &+ (a_{12}A_{11} + a_{22}A_{21} + \cdots + a_{n2}A_{n1})c_2 \\
        &+ \cdots \\
        &+ (a_{1n}A_{11} + a_{2n}A_{21} + \cdots + a_{nn}A_{n1})c_n \\
        &= b_1A_{11} + b_2A_{21} + \cdots + b_nA_{n1}.
    \end{split}
    \tag{19}
$$


By Theorem 1.51, the coefficient of $c_1$ in (19) equals the determinant
$D$ itself. By Theorem 1.52, the coefficients of all the other $c_j$
($j \neq 1$) vanish. The expression in the right-hand side of (19) is
the expansion of the determinant 
$$
D_1 = 
\begin{vmatrix}
    b_1 & a_{12} & \cdots & a_{1n} \\
    b_2 & a_{22} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    b_n & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
$$
 with respect to its first column. Therefore (19) can now
be written in the form 
$$
Dc_1 = D_1 \implies c_1 = \frac{D_1}{D}.
$$
 In
an analogous manner, we have $c_j = \frac{D_j}{D}$, where $D_j$ is the
determinant otained from $D$ by replacing its $j$th column with the
numbers $b_1, b_2, \dots, b_n$.

### Minors of Arbitrary Order. Laplace's Theorem

If we delete $k < n$ rows and the same number of columns from a square
matrix of order $n$, the remaining elements form a square matrix of
order $k$. The determinant of this matrix is called a *minor of order
$k$* of the original matrix. It is denoted by:

$$
M = M_{j_1, j_2, \dots, j_n}^{i_1, i_2, \dots, i_n},
$$
 where
$i_1, i_2 \dots, i_k$ are the numbers of the deleted rows, and
$j_1, j_2, \dots, j_k$ are the numbers of the deleted columns.

If we on the other hand delete the rows and columns that make up $M$
from the original matrix, we get the *complementary minor*, $\bar{M}$,
of the minor M, a square matrix of order $n - k$. For example, if $M$ is
of order $1$, i.e. is just some element $a_{ij}$, then
$\bar{M} = M_{ij}$.

### Linear Dependence between Columns

*If one of the columns of the determinant $D$ is a linear combination of
other columns, then $D = 0$*. We can subtract the other columns from
that one column, it wouldn't change the value of the determinant, but we
would end up with a determinant that has a column that only consists of
zeroes, and thus $D = 0$. Also, the converse is true: *If $D = 0$, then
(at least) one of its columns is a linear combination of the other
columns.*

The **rank** of a matrix $A$ is some integer $r$ for which: 1. The
matrix $A$ has a minor (called the basis minor) of order $r$ which does
not vanish; 2. Every minor of $A$ of order $r+1$ and higher vanishes.

**Basis minor theorem.** *Any column of the matrix A is a linear
combination* of its basis columns.

Consider we have the following relation describing the linear
independence of columns with a coefficient, say, $\lambda_m \neq 0$:

$$
\sum\limits_{k=1}^{m-1} \lambda_k A_k + \lambda_m A_m = 0
$$
 from here
we immediately see that:

$$
\sum\limits_{k=1}^{m-1} \frac{-\lambda_k}{\lambda_m} A_k = A_m
$$
 which
shows that $A_m$ is a linear combination of the columns
$A_1, A_2, \dots A_{m-1}$.

*A determinant $D$ vanishes if and only if there is linear dependence
between its columns.* And from the transposition operation, we get *A
determinant $D$ vanishes if and only if there is linear dependence
between its rows.*

# Linear Spaces

## Definitions

Linear spaces generalize vector operations to the set of all vectors. It
steps away from the concreteness of the objects (directed line segment,
vectors) without changing the properties of the operations on the
objects. A set **K** is called a linear (or affine) space over a field
$K$ if

1.  Given any two elements, $x,y \in \mathbf{K}$, there is a rule that
    leads to a unique element $x + y \in \mathbf{K}$, called the *sum*
    of $x$ and $y$.

2.  Given any element $x \in \mathbf{K}$ and any number $\lambda \in K$,
    there is a rule leading to a unique element
    $\lambda x \in \mathbf{K}$, called the product of the element $x$
    and the number $\lambda$.

3.  These two rules obey the axioms listed below.

The elements of a linear space will be called vectors, though their
nature will differ slightly to directed line segments. It will help with
the geometric intuition for things.

### Axioms For the Addition Rule

1.  $x + y = y + x$ for all $x, y \in \mathbf{K}$.

2.  $(x + y) + z  = x + (y + z)$ for all $x, y, z \in \mathbf{K}$.

3.  There exists an element $0 \in \mathbf{K}$ so that $x + 0 = x$ for
    all $x \in \mathbf{K}$.

4.  For every $x \in \mathbf{K}$ there exists an element
    $y \in \mathbf{K}$ so that $x + y = 0$.

### Axioms For the Multiplication Rule

1.  $1 \cdot x = x$ for every $x \in \mathbf{K}$.

2.  $(\alpha \beta)x  = \alpha(\beta x)$ for all
    $\alpha, \beta \in \mathbf{K}$.

3.  $(\alpha + \beta)x = \alpha x + \beta x$ for all $x \in \mathbf{K}$
    and every $\alpha, \beta \in K$.

4.  $\alpha(x + y) = \alpha x + \alpha y$ for all $x,y \in \mathbf{K}$
    and every $\alpha \in K$.

A linear space over the field $R$ of real numbers will be called *real*
and denoted by $\mathbf{R}$. A linear space over the field $C$ of
complex numbers will likewise be called *complex* and be denoted by
**C**. If the nature of elements $x,y,z,\dots$ and the rules for
operating on them are specified, we call the linear space concrete. Some
example of concrete spaces:

1.  The space $V_3$. The elements of this space are the free vectors
    studied in three-dimensional analytic geometry. Each vector is
    characterized by a length and a direction. We also have $V_2$ for
    two-dimensional vectors, $V_1$ for one-dimensional vectors, etc.

2.  The space $K_n$. The numbers $\xi_1, \xi_2, \dots, \xi_n$ are called
    the *component* of the element $x$. The operations of addition and
    multiplication by a number $\lambda \in K$ are specified by:
    
$$
\begin{aligned}
                    (\xi_1, \xi_2, \dots, \xi_n) + (\eta_1, \eta_2, \dots, \eta_n) &= (\xi_1 + \eta_1, \xi_2 + \eta_2, \dots, \xi_n + \eta_n) \\
                    \lambda(\xi_1, \xi_2, \dots, \xi_n) &= (\lambda \xi_1, \lambda \xi_2, \dots, \lambda \xi_n).
                \end{aligned}
$$


    If $K$ is the field of real numbers, we write $R_n$; if $K$ is the
    field of complex numbers, we write $C_n$.

3.  The space $R(a, b)$. An element of this space is any continuous real
    function $x = x(t)$ defined on the interval $a \leq t \leq b$.

4.  Correspondingly, we have $C(a,b)$, the space of all continuous
    complex-valued functions on the interval $a \leq t \leq b$.

## Linear Dependence

Let $x_1, x_2, \dots, x_n$ be vectors of the linear space **K** over a
field $K$, and let $\alpha_1, \alpha_2, \dots, \alpha_k$ be numbers from
$K$. The vector

$$
\mathbf{y} = \alpha_1 x_1 + \alpha_2 x_2 + \dots + \alpha_k x_k
$$
 is
called a **linear combination** of the vectors $x_1, x_2, \dots, x_k$
and the numbers $\alpha_1, \alpha_2, \dots, \alpha_k$ are the
**coefficients** of the linear combination. If may exist a linear
combination of the vectors $x_1, x_2, \dots, x_k$ which equals the zero
vector, even though not all $\alpha_i$ would be zero. In other words, if

$$
\alpha_1 x_1 + \alpha_2 x_2 + \dots + \alpha_k x_k = 0
$$
 for some set
of coefficients that are not all zero. The vectors would be called
*linearly dependent*. If the equality is true only when $\alpha_i = 0$
(for $i = 1, 2, \dots, k$), the vectors are said to be *linearly
independent* (over $K$).

**Examples**

1.  In $V_3$, linear dependence of two vectors mean that they are
    parallel to the same straight line. Linear dependence of three
    vectors means that they are parallel to the same plane. Any four
    vectors are linearly dependent.

2.  Linear dependence of the vectors
    $x_1 = x_1(t), x_2 = x_2(t), \dots, x_k = x_k(t)$ in the space
    $R(a,b)$ or $C(a, b)$ means that the function
    $x_1(t), x_2(t), \dots, x_n(t)$ satisfy a relation of the form
    
$$
\alpha_1 x_1(t) + \alpha_2 x_2(t) + \dots + \alpha_k x_k(t) = 0
$$

    where at least one of the constants $\alpha_i \neq 0$.

    For example, the functions
    
$$
x_1(t) = \cos^2 t, \quad x_2(t) = \sin^2 t, \quad x_3(t) = 1
$$
 are
    linearly dependent, since the relation
    
$$
x_1(t) + x_2(t) - x_3(t) = 0
$$
 holds. The functions
    $1, t, t^2, \dots, t^k$ are linearly independent.

## Bases, Components, Dimension

A system of linearly independent vectors $e_1, e_2, \dots, e_n$ in a
linear space **K** over a field $K$ is called a **basis** for **K** if,
given any $x \in \mathbf{K}$, there exists an expansion

$$
x = \xi_1 e_1 + \xi_2 e_2, + \dots + \xi_n e_n \quad (\xi_j \in K, j=1,2,\dots,n)
$$

i.e. if any vector $x$ can be expressed as a linear combination of the
basis vectors $e_1, e_2, \dots, e_n$. Here the uniquely defined numbers
$\xi_1, \xi_2, \dots, \xi_n$ are called the *components of the vector
$x$ with respect to the basis $e_1, e_2, \dots, e_n$*.

When the two components of a linear space **K** are added, their
components are added. When a vector is multiplied by a number $\lambda$,
all it components are multiplied by $\lambda$. Let 
$$
\begin{aligned}
        x &= \xi_1 e_1 + \xi_2 e_2 + \dots + \xi_n e_n, \\
        y &= \eta_1 e_1 + \eta_2 e_2 + \dots + \eta_n e_n,
    \end{aligned}
$$
 then 
$$
\begin{aligned}
        x + y &= (\xi_1 + \eta_1)e_1 + (\xi_2 + \eta_2)e_2 + \dots + (\xi_n + \eta_n)e_n \\
        \lambda x &= \lambda \xi_1 e_1 + \lambda \xi_2 e_2 + \dots + \lambda \xi_n e_n
    \end{aligned}
$$
 by the axioms for multiplication and addition.

If in a linear space **K** we can find $n$ linearly independent vectors
while every $n + 1$ vectors of the space are linearly dependent, then
the number $n$ is called the dimension of the space **K**, and the space
**K** itself is called *n-dimensional*. A linear space in which we can
find an arbitrarily large number of linearly independent vectors is
called *infinite-dimensional*.

## Subspaces

Suppose that a set **L** of elements of a linear space **K** has the
following properties:

1.  If $x,y \in \mathbf{L}$, then $x + y \in \mathbf{L}$;

2.  If $x \in \mathbf{L}$ and $\lambda$ is an element of the field $K$,
    then $\lambda x \in \mathbf{L}$.

We find that **L** is a linear space. We also find that every set
$\mathbf{L} \subset \mathbf{K}$ with properties (a) and (b) is called a
*linear subspace* (or simply subspace) of the space **K**. Examples:

1.  The set ${0}$ is the smallest subspace of **K**, and **K** itself is
    the largest possible subspace of **K**. These are called the
    *trivial* subspaces of **K**.

2.  Consider the set $L$ of all vector $(\xi_1, \xi_2, \dots, \xi_n)$ in
    the space $K_n$, whose coordinates satisfy a system of linear
    equations of the form 
$$
\begin{aligned}
                    a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= 0 \\
                    a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= 0 \\
                    \vdots \quad \quad \quad \quad & \\
                    a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n &= 0 
                \end{aligned}
$$
 with all $a_{ij} \in K$. Such a system
    is called a *homogenous* linear system. This kind of system is
    always compatible, since it obviously has the solution
    $x_1 = x_2 = \dots = x_n = 0$.

    Let $c_1^{(1)}, c_2^{(1)}, \dots, c_n^{(1)}$ and
    $c_1^{(2)}, c_2^{(2)}, \dots, c_n^{(2)}$ be two solutions of this
    system. We also have
    
$$
c_1 = c_1^{(1)} + c_1^{(2)}, c_2 = c_2^{(1)} + c_2^{(2)}, \dots, c_n = c_n^{(1)} + c_n^{(2)}
$$

    as a solution to the system. Similarly, for every fixed
    $\lambda \in K$, the numbers
    $\lambda c_1, \lambda c_2, \dots, \lambda c_n$ also form a solution
    to the system, given that the numbers $c_1, c_2, \dots, c_n$
    themselves consistute a solution.

    The set $L$ we mentioned is also a linear space in its own right. It
    is called the *solution space of the system*.

Every linear relation which connects the vectors $x,y,\dots, z$ in a
subspace **L** is also valid in the whole space **K** and conversely.
The fact that vectors $x,y,\dots,z \in \mathbf{L}$ are linearly
dependent holds simulatenously true in the subspace **L** and in the
space **K**. E.g., if every set of $n+1$ vectors is linearly dependent
in **K**, this fact is true in the subspace **L**. It follows that
$\dim(\mathbf{L}) \leq \dim(\mathbf{K})$, given
$\mathbf{L} \subset \mathbf{K}$.

Given a basis $f_1, f_2, \dots, f_l$ of the subspace **L** (of dimension
$l < n$), we can always choose additional vectors $f_{l+1}, \dots f_n$
in the whole space **K** such that the system
$f_1, f_2, \dots, f_l, \dots, f_n$ is a basis for **K**.

The vectors $g_1, \dots g_k$ are linearly independent over the subspace
$\mathbf{L} \subset \mathbf{K}$ if the relation

$$
\alpha_1 g_1 + \dots + \alpha_k g_k \in \mathbf{L} \quad (\alpha_1, \dots, \alpha_k \in K)
$$

implies 
$$
\alpha_1 = \dots = \alpha_k = 0.
$$
 So essentially, no linear
combination of these vectors can \"fall back\" into **L** unless the
coefficients are all zero. Conversely, to be *linearly dependent over
**L*** is to have some non-trivial way to combine the vectors
$g_1, \dots, g_k$ to get a vector in **L**.

The largest possible number of vectors of the space **K** which are
linearly independent over the subspace $\mathbf{L} \subset \mathbf{K}$
is called the *dimension of **K** over **L***. This number is always
$\dim(\mathbf{K}) - \dim(\mathbf{L})$.

A linear space **L** is the *direct sum* of given subspaces
$\mathbf{L}_1, \dots, \mathbf{L}_m \subset \mathbf{L}$ if

1.  For every $x \in \mathbf{L}$ there exists an expansion
    
$$
x = x_1 + \dots + x_m,
$$
 given
    $x_1 \in \mathbf{L}_1, \dots, x_m \in \mathbf{L}_m$, and

2.  This expansion is unique, i.e.:
    
$$
x = x_1 + \dots + x_m = y_1 + \dots + y_m \implies x_1 = y_1, \dots, x_m = y_m,
$$

    given $x_j, y_j \in \mathbf{L}_j \quad (j = 1, \dots, m)$

We can express any n-dimensional space $\mathbf{K}_n$ as the direct sum
of two subspaces $\mathbf{L}, \mathbf{M} \subset \mathbf{K}_n$. If the
basis of **L** consists of vectors $f_1, \dots f_l$, then the basis of
**M** can be represented as vectors $f_{l+1}, \dots f_n$. Combining
these, we get the basis of $\mathbf{K}_n$.

The dimension of the sum of two subspaces is equal to the sum of their
dimensions minus the dimension of their intersection.

**Classes and quotient spaces.** Let **K** be a vector space and
$\mathbf{L} \subset \mathbf{K}$ a subspace. The space **K** can be
partitioned into equivalence classes (denoted **K**/**L**), where two
vectors $x, y \in \mathbf{K}$ are in the same class if
$x - y \in \mathbf{L}$. Each class represents vectors differing by
elements of **L**.

1.  Addition: For classes $\mathbf{X,Y} \in \mathbf{K/L}$ choose
    representatives $x \in \mathbf{X}$, $y \in \mathbf{Y}$. Then
    $\mathbf{X + Y}$ is the class containing $x + y$.

2.  Scalar multiplication: For $\alpha \in K$ and
    $\mathbf{X} \in \mathbf{K/L}$, $\alpha \mathbf{X}$ is the class
    containing $\alpha x$.

These operations are well-defined and make **K**/**L** a vector space,
called the *factor space* or *quotient space* of **K** with respect to
**L**.

In **K/L**, **L** is collapsed to the zero class. Vectors differing by
an element of **L** are treated as equivalent, ignoring variations
within **L**. For example, in $\mathbf{K} = \mathbb{R}^2$ and **L** the
x-axis, vectors like $(1, 0)$ and $(3, 0)$ are in the same class, as
their difference $(2, 0) \in \mathbf{L}$. Thus, **K/L** collapses to the
y-axis, a 1-dimensional space, since the x-coordinate (variations along
**L**) is ignored.

The quotient space **K/L** always has a dimension of $n - l$, given that
$n = \dim(\mathbf{K}), \,\, l = \dim(\mathbf{L})$.

## Linear Manifolds

Let $x,y,z,\dots$ be a system of vectors of a linear space **K**. The
*linear manifold spanned by $x,y,z, \dots$, denoted $L(x,y,z,\dots)$* is
the set of all (finite) linear combinations

$$
\alpha x + \beta y + \gamma z + \dots
$$
 with coefficients
$\alpha, \beta, \gamma, \dots \in K$. Every subspace containing the
vectors $x,y,z,\dots$ also contains their linear combinations.
Consequently $L(x,y,z,\dots)$ is the smallest subspace containing these
vectors.

## Hyperplanes

Let **L** be a subspace of a linear space **K** and let
$x_0 \in \mathbf{K}$ be a fixed vector which does not belong to **L**.
Consider the set **H** of all vectors of the form 
$$
x = x_0 + y
$$
 where
$y$ ranges over the whole subspace **L**. Then **H** is called a
**hyperplane**, more specifically, the result of shifting the subspace
**L** by the vector $x_0$. Note that in general a hyperplane itself is
not a linear space.

## Morphisms of Linear Spaces

Let $\omega$ be a rule which assign to every given vector $x'$ of a
linear space $\mathbf{K'}$ a vector $x''$ in a linear space
$\mathbf{K''}$. Then $\omega$ is called a *morphism* (or linear
operator) (from $\mathbf{K'}$ to $\mathbf{K''}$) if the following two
conditions hold:

1.  $\omega(x' + y') = \omega(x') + \omega(y')$ for every
    $x', y' \in \mathbf{K'}$

2.  $\omega(\alpha x') = \alpha \omega(x')$ for every
    $x' \in \mathbf{K'}$ and every $\alpha \in K$.

Different kinds of morphisms:

1.  A morphism $\omega$ mapping the space $\mathbf{K'}$ onto the whole
    space $\mathbf{K''}$ is called an epimorphism.

2.  A morphism $\omega$ mapping $\mathbf{K'}$ onto part (or all) of
    $\mathbf{K''}$ in a one-to-one fahion
    ($x' \neq y' \implies \omega(x') \neq \omega(y'))$ is called a
    monomorphism.

3.  A morphism $\omega$ mapping $\mathbf{K'}$ onto all of $\mathbf{K''}$
    in a one-to-one fashion (both an epimorphism and a monomorphism) is
    called an isomorphism, and the spaces $\mathbf{K'}$ and
    $\mathbf{K''}$ are said to be isomorphic (more exacly,
    *$K$-isomorphic*).

The usual notation for a morphism is

$$
\omega: \mathbf{K'} \rightarrow \mathbf{K''}
$$


# Systems of Linear Equations

## More on the Rank of a Matrix

Given a general matrix $||a_{ij}||$ with $n$ rows and $k$ columns,
consider any chosen $m$ rows and columns. The elements which appear at
the intersection of these rows and columns form a square matrix of order
$m$. The determinant of this matrix is called a *minor of order $M$ of
the matrix $A$*. If this minor is nonvanishing, the rank of the matrix
will be $m$.

## The General Solution of a Linear System

Consider we have a general (i.e. nonhomogeneous) system of linear
equations 
$$
\begin{aligned}
        a_{11}x_1 + a_{12}x_2 + &\dots + a_{1n}x_n = b_1, \\
        a_{21}x_1 + a_{22}x_2 + &\dots + a_{2n}x_n = b_2, \\
                                &\vdots \\
        a_{k1}x_1 + a_{12}x_2 + &\dots + a_{kn}x_n = b_k,
    \end{aligned}
$$
 and a corresponding homogeneous linear system (i.e.
$b_1 = b_2 = \dots = b_k = 0$).

By a *general solution of the system* is meant a set of expressions

$$
x_j = f_j(a_{11}, \dots, a_{kn}, b_1, \dots, b_k, q_1, \dots, q_s) \quad (j = 1,\dots,n)
$$

where every $f_j$ is a function depending on the coefficients $a_{ij}$,
the constants $b_j$ and certain undetermined parameters
$q_1, \dots, q_s$ such that

1.  The quantities $x_j = c_j \,\, (j=1,\dots,n)$ obtained for arbitrary
    fixed parameters $q_1, \dots, q_s \in K$ constitute a solution to
    the system;

2.  Any given solution of the system can be obtained this way by
    suitably choosing the parameters $q_1, q_s \in K$

The general solution of the nonhomogeneous system can be expressed as
$x_0 + y$, where $x_0$ is any solution of the nonhomogeneous system, and
$y$ ranges over the set of all solutions of the corresponding
homogeneous system. The set of all solutions to the nonhomogeneous
system is just $x_0 + y$.

Say we know that the rank of the coefficient matrix of a system of order
$m$ is $r$. We can put the rest of the columns to the other side in the
following manner: 
$$
\begin{aligned}
        a_{11}x_1 + a_{12}x_2 + &\dots + a_{1r}x_r = b_1 - a_{1,r+1}x_{r+1} - \dots - a_{1n}x_{n}   \\
        a_{21}x_1 + a_{22}x_2 + &\dots + a_{2r}x_r = b_2 - a_{2,r+1}x_{r+1} - \dots - a_{2n}x_{n}   \\
                                &\vdots \\
        a_{k1}x_1 + a_{k2}x_2 + &\dots + a_{kr}x_r = b_k - a_{k,r+1}x_{r+1} - \dots - a_{kn}x_{n}.  \\
    \end{aligned}
$$


We can give the unknowns $x_{r+1}, \dots, x_n$ arbitrary values
$c_{r+1},\dots,c_n$, and see that the right-hand side can be expressed
as a linear combination of the vectors $x_1, \dots, x_r$. We can use
Cramer's Rule to solve this system. We get

$$
c_j = \frac{M_j}{M}(b_1 - a_{1,r+1}x_{r+1} - \dots - a_{1n}x_{n}) \text{ for } j = 1,2,\dots,r
$$


## Geometric Properties of the Solution Space

As we have seen, the solutions of a generic homogeneous linear system
with a coefficient matrix of rank $r$ form a linear solution space, $L$.
The dimension of $L$ is $n-r$. The solution space and the space
$K_{n-r}$ are isomorphic.

Any system of $n -r$ linearly dependent solutions of a homogenous linear
system of equations (which forms a basis in the space of *all*
solutions) is called a *fundamental system of solutions*.

We can construct a fundamental system of solutions by using any basis of
the space $K_{n-r}$.

## Methods for Calculating the Rank of a Matrix

Given a matrix with $n$ rows and $k$ columns, formed from vectors
$x_1, x_2, \dots, x_k$ in the $n$-dimensional space $R_n$, we can
calculate the rank of a matrix using the following elementary
operations:

1.  *Permutation of columns.* The dimension of the linear manifold
    spanned by the vectors is not affected by the order in which the
    vectors are written.

2.  *Dividing out a nonzero common factor of the elements of a column.*
    Say we factor out a number $\lambda \neq 0$ from the $j$th vector.
    This is equivalent to replacing the system of vectors
    $x_1, x_2, \dots, \lambda x_j, \dots, x_k$ with
    $x_1, x_2, \dots, x_j, \dots, x_k$. This does not actually change
    the dimension of the linear manifold spanned by the vectors.

3.  *Adding a multiple of one column to another column.*

4.  *Deletion of a column consisting entirely of zeros.* Deleting the
    zero vector from the system does not change the linear manifold.

5.  *Deletion of a column which is a linear combination of the other
    columns.*

We can reduce a matrix $A$ to one of the two following forms:

$$
A_1 = \begin{bmatrix}
\alpha_1 & 0 & 0 & \cdots & 0 & 0 & \cdots & 0 \\
c_{21} & \alpha_2 & 0 & \cdots & 0 & 0 & \cdots & 0 \\
c_{31} & c_{32} & \alpha_3 & \cdots & 0 & 0 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \cdots & \vdots \\
c_{k1} & c_{k2} & c_{k3} & \cdots & \alpha_k & 0 & \cdots & 0 \\
c_{k+1,1} & c_{k+1,2} & c_{k+1,3} & \cdots & c_{k+1,k} & 0 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \cdots & \vdots \\
c_{n1} & c_{n2} & c_{n3} & \cdots & c_{nk} & 0 & \cdots & 0
\end{bmatrix}
$$


or 
$$
A_2 = \begin{bmatrix}
\alpha_1 & 0 & 0 & \cdots & 0 \\
c_{21} & \alpha_2 & 0 & \cdots & 0 \\
c_{31} & c_{32} & \alpha_3 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
c_{m1} & c_{m2} & c_{m3} & \cdots & \alpha_m \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
c_{n1} & c_{n2} & c_{n3} & \cdots & c_{nm}
\end{bmatrix}
$$
 where $\alpha_1, \alpha_2, \dots \neq 0$. The rank of
$A_1$ is $k$ and its basis minor is at the upper left-hand corner. The
rank of $A_2$ is $m$ and its basis minor is in the first $m$ rows.
