---
title: "ML Engineers: Start Learning Math by Coding"
description: 'I was scrolling on X and I saw a person giving advice about le...'
published: false
date: '2024-06-02'
slug: 'math-programming'
tags: ['math', 'ml']
---

I was scrolling on X and I saw people talking about mathematics. The thread continued on to a person giving advice about learning calculus. My curiosity was sparked by this tweet in particular:

<div class="w-full flex justify-center items-center p-0 m-0 tc">
    <div data-tweet="1796529932505436548" />
</div>

Math? In a programming language? I've been doing software engineering for like five years, yet this idea was completely alien to me. I happen to have the book the tweet was referring to, and I really had to ask myself if I've been doing something wrong. I did a little bit of thinking and I eventually came to the conclusion that it's quite a trivial idea. A further elaboration was eventually given by the original tweeter:

<div class="w-full flex justify-center items-center p-0 m-0 tc">
    <div data-tweet="1796535324350484627" />
</div>

You don't see people talking about this kind of idea, although it'd be especially beneficial in the field of machine learning. I think it really has the potential to make ML and the mathematics behind it much more interesting to learn for people with a programming background.

God blessed me again by giving me more posts on X about the relationship between mathematics and programming:

<div class="w-full flex justify-center items-center p-0 m-0 tc">
    <div data-tweet="1796038337729294575" />
</div>

So I started thinking about it even more - why not just consider the entirety of mathematics in terms of code? **Why not just use code as a way to take math notes?** I used to write all my notes in pure LaTeX, but now I realized it's simply an inferior method. Implementing mathematical functions in code is so much more hands-on, so it's much more likely that the things you learn will stick.

One might say that there already exist articles that highlight the relationship between mathematics and code. However, most of these articles already use an underlying library like NumPy to actually do the math. At that point the learning is prioritizing application, but the approach in this article strives to learn the principle. I'd argue it's comparable to using `scikit-learn` to implement linear regression instead of doing it from scratch - ideal for production but not so much for learning.

<!--However, documentation behind how one may approach this idea is incredibly scarce. I'll take a step and try to document my own approach with learning mathematics through code. There's lots of room for a business idea here.-->

At first I thought of just writing pure code and documenting the math in comments. however, LaTeX is still incredibly useful for notation. It would certainly be hard getting rid of it. So, what's a solution that supports code AND LaTeX? Jupyter Notebooks? Perhaps.

<!-- Write some statistics in Python and document it in the blog post. Maybe make a separate structure for code-based math notes on your website.
-- Also figure out the ideal platform, Jupyter Notebooks?-->

## My Approach

Consider this example. Let's define the **arithmetic mean**:
$$
\overline x = \frac{1}{n} \sum\limits_{i=1}^{n}{x_i}
$$

In Python code:

```python
def arithmetic_mean(x):
    return (1 / len(x)) * sum(x)

```
--- Juho, https://vlimki.dev
