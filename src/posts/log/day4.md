---
title: "Getting Started With Probability and Statistics - Day 4 of ML"
description: "First part of the code-centric approach to stats series."
published: true
date: '2024-06-11'
slug: 'day4'
post: true
tags: ['log', 'math', 'statistics']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 0.5h <br /> **Total**: 13.5h/10000h

Learning statistics also gives you a brief look into data analysis & data visualization. Perhaps I'll turn this into bigger blog post about a code-based statistics approach with matplotlib and pandas.

Totally slacked off today though. Feeling quite optimistic regardless.
___

Imagine rolling a die. Assuming perfectly fair circumstances, the chances of you throwing any particular face will be $\frac{1}{6}$. Seems trivial enough, no?

Unfortunately, it's not always that trivial, and this is where machine learning can help. For example, imagine that the die has a slightly irregular weight distribution, so that the probability of you throwing any face is unknown. A good way of figuring the probabilities out would be to generate a sample dataset of the throws you get and building a model based on that dataset to predict the next throws. That's called a probabilistic model, and is at the core of how machine learning works.

**Multidimensional data** is the simplest form of data - for example, a CSV file, an Excel sheet - it is simply an $n \times m$ matrix, which is essentially just $n$ **feature vectors** $\vec x_1 \dots \vec x_n$ (also referred to as data points) of size $m$. $m$ is also considered the **dimension** of the data set. If $m=1$, the dataset is referred to as **univariate** data, but if $m>1$, it's referred to as **multivariate** data.
