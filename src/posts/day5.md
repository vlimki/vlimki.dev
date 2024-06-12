---
title: "Basic Probability Theory & Bayes' Theorem - Day 5 of ML"
description: "Continuing on statistics and probability."
published: true
date: '2024-06-12'
slug: 'day5'
tags: ['journey', 'math', 'statistics']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 3h <br /> **Total**: 16.5h/10000h

I found that writing code to represent these things is a bit redundant, it wouldn't really help much intuition-wise either. Perhaps it'll be a different case when going over statistics in-depth.

However, I'm probably planning to do linear algebra next as opposed to diving deeper into statistics. Perhaps there will be more coding on on it.
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

Events have the same operations as just any ordinary set would. For example, the **union** of two events $A$ and $B$ (denoted $A \cup B$) is the event where either $A$ or $B$ occur. It's a bit like the logical OR operator $\lor$, it's just smoother! We also have something for the set intersection operator, $\cap$. What's $A \cap B$ then? Not surprisingly, it's called the **intersection** of $A$ and $B$, which is the event that **both** $A$ and $B$ occur. Also a bit like the logical AND operator $\land$.

Next we have what is called the **conditional probability** of two events $A$ and $B$, denoted $P(A | B)$. This is simply the probability of $A$ happening considering $B$ has already happened. This is how it is calculated:

$$
P(A|B) = \frac{P(A \cap B)}{P(B)}
$$

The **law of total probability** is a way to calculate the total probability of an event by considering all possible ways that the event can occur. For this we use a method called **sample space partitioning**.

We partition the sample space into exhaustive and mutually exclusive events - as in they cannot happen at the same time and they cover every possible outcome - $B_1, B_2,\ldots,B_n$, and we sum the probabilities of **any event $A$ occurring within each partition** $P(A|B)$ multiplied by the **probability of the partition itself** $P(B)$:

$$
P(A) = \sum\limits_{i=1}^{n}{P(A|B_i) \cdot P(B_i)}
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

**Example 1**: Let's do calculations with the weather example. 

Remember:
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

**Example 2**: Suppose a test for a disease is 99% accurate (true positive rate) with a 5% false positive rate, and the disease is present in 1% of the population. If you test positive, use Bayes' Theorem to find the probability that you actually have the disease. <br/>
**Solution**: Let's notate the event of having the disease as $D$, and not having the disease as $\lnot D$. Let's then denote the event of the test truth value being positive as $T^{+}$.

We're given:
1. $P(D) = 0.01$
2. $P(T^{+}|D) = 0.99$
3. $P(T^{+}|\lnot D) = 0.05$

Whoa - we can't directly plug these into the Bayes' Theorem formula! We're missing $P(T^{+})$. Let's first use the total probability rule to calculate it. Recall:


$$
P(A) = \sum\limits_{i=1}^{n}{P(A|B_i) \cdot P(B_i)}
$$

We can use $P(T^{+}|D)$ and $P(T^{+}|\lnot D)$ to find it. First we need to calculate $P(\lnot D)$ - which can be also denoted as $P(D^c)$ - is simply $1 - P(D) = 0.01$. Now we can plug the values in the total probability rule formula:

$$
P(T^{+}) = P(T^{+}|D) \cdot P(D) + P(T^{+}|\lnot D) \cdot P(\lnot D) \newline = (0.99 \cdot 0.01) + (0.05 \cdot 0.99) = 0.0594
$$

Now we apply Bayes' Theorem:
$$
P(D|T^{+}) = \frac{P(T^{+}|D) \cdot P(D)}{P(T^{+})} = \frac{0.99 \cdot 0.01}{0.0594} \approx 0.167
$$

So, the chance of you actually having the disase is only $16.7\%$! Quite low, isn't it? Probability theory gets very interesting very quickly.
