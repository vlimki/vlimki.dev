---
title: "Basic Probability Theory + Bayes' Theorem - Day 5 of ML"
description: "Perhaps it'll be better for me to prioritize linear algebra over statistics for now."
published: true
date: '2024-06-12'
slug: 'day5'
tags: ['journey', 'math', 'statistics']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: h <br /> **Total**: 13.5h/10000h

I'm going to jump ship. I'll only be looking at very basic probability and statistics and then I'll be studying linear algebra in depth.

___

## Introduction To Probability Theory 
The **probability** $P$ of an event $A$, denoted $P(A)$, measures the likelihood of some event happening. It ranges anywhere from 0 to 1, where 0 means impossible and 1 means certain. For example, $P(Heads) = 0.5$ in a fair coin flip.

The **sample space** $S$ is the set of **all possible outcomes** of a probability experiment. For example, when you flip a coin, the sample space would be:
$$
S = \{Heads, Tails\}.
$$ 

When you flip a coin twice, the sample space becomes $S = \{HH, HT, TH, TT\}$. An **event** is a subset of the sample space (denoted $A \subset S$).

The **complement** of an event $A$, denoted $A^c$, is the event that $A$ does **not** happen.

$$
P(A^c) = 1 - P(A)
$$

Events have the same operations as just any ordinary set would. For example, the **union** of two events $A$ and $B$ (denoted $A \cup B$) is the event where either $A$ or $B$ occur. It's a bit like the logical OR operator $\lor$, it's just smoother!
$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

What's $A \cap B$ then? That's called the **intersection** of $A$ and $B$, which is the event that **both** $A$ and $B$ occur. Also a bit like the logical AND operator $\land$.

Next we have what is called the **conditional probability** of two events $A$ and $B$, denoted $P(A | B)$. This is simply the probability of $A$ happening considering $B$ has already happened. This is how it is calculated:

$$
P(A|B) = \frac{P(A \cap B)}{P(B)}
$$

## Bayes' Theorem
Bayes' Theorem let's us update our beliefs or probabilities based on **new evidence**. It's not terribly intuitive at first, but we'll break it down. Let's go over the formula for Bayes' Theorem first:

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

That is a lot to chew. Let's take this step by step with an example:
1. $P(A)$ is the **prior probability** - the initial probability of event $A$ occurring. Let's say you had to guess the weather. You'd guess that there's a 10% chance of it raining outside based on things like past data and the time of the year - that's your prior probability.
2. $P(B|A)$ is called the **likelihood**. It is the probability of seeing the new evidence. Let's say the chance of you seeing dark clouds when it rains is 70%. Seeing dark clouds is yor new evidence. Let's denote it as $B$. So $P(B|A)$ states the probability of you seeing dark clouds when it rains. And it's $0.7$, or $70\%$. See where I'm going with this?
3. $P(B)$ is the **marginal probability** or **evidence**, the absolute probability of $B$ occurring. Overall, what is the absolute chance that you'll be seeing dark clouds, regardless of whether it's raining or not? For the sake of example, let's say 15%.
4. The formula solves for $P(A|B)$, which is your updated belief about the weather after considering the new evidence. Do you see dark clouds? Well, you update your belief about the weather. Hence it's called the **posterior probability**.

### Using Bayes' Theorem
Let's do calculations with the weather example. Remember
1. $P(A)$ is what you think the probability of raining is before checking if there are dark clouds.
2. $P(B|A)$ is the probability of there being dark clouds when it rains.
3. $P(B)$ is the probability of you actually seeing dark clouds.

$$
P(A) = 0.10,\,\, P(A|B) = 0.9, \,\, P(B) = 0.15 
$$

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}= \frac{0.9 \cdot 0.10}{0.15} = \frac{0.09}{0.15} = \frac{9}{15} = 0.6
$$

So, the probability that it will rain assuming you **do** actually see the dark clouds is 60%. After seeing the dark clouds, you update your belief from 10% to 60%.

Let's take all these definitions and use them to do some calculations.

**Example 1**: Find the probability $P$ of the next card on the deck being an Ace of spades.<br/>
**Solution**: Let $Ace$ be the event of drawing an Ace, and let $Spade$ denote the event of drawing a Spade. We can express the 


<!--Quantitative or numeric data is something that has a natural ordering, age, for example. Categorical data is something that does not have a natural ordering, such as a ZIP code.

**One-hot encoding** is a way for us to take categorical data and turn it into **binary** data. Binary data is a way to transform categorical information into a format more convenient for staistical analysis. Imagine zip codes - what one-hot encoding does is it makes a binary value for every possible zip code, and sets the value to 0 for every zip code except the one in question.

Two common forms of summaries of the data distribution are:
- **measures of central tendency**, e.g the median, and
- **measures of dispersion**, variance for example.-->
