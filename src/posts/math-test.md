---
title: 'Testing KaTeX Mathematics with Svelte + MDsveX'
description: "Testing the capabilities of my blogging system (I have no idea how to write a real blog post yet)"
date: '2024-02-18'
published: true
tags: ["math", "web"]
---

<script>
    import PageBreak from '$lib/components/PageBreak.svelte';
    import FooterText from '$lib/components/FooterText.svelte';
    import Image from '$lib/components/Image.svelte';
</script>

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Here's some example LaTeX: $\sum\limits_{n=1}^{6}{2x^2}$

$$
J(w,b) = \frac{1}{2m}\sum\limits^{m}_{i=1}{(\hat y_i - y_i)^2}
$$
<FooterText text="A bigger LaTeX block" />


```python
def cost(x, y, w, b):
    m = x.shape[0]

    err = [((np.dot(w, x[i]) + b) - y[i]) ** 2 for i in range(m)]
    return (1 / (2 * m)) * sum(err)
```
<FooterText text="Example code" />

## Lorem Ipsum
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


<Image text="A test image." src="/bg.jpeg" />
