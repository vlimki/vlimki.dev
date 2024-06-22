---
title: "Feature Engineering - Day 15 of ML"
description: "Briefly going over some ways to optimize our datasets before feeding them to ML models."
published: true
date: '2024-06-22'
slug: 'day15'
tags: ['journey', 'ml', 'engineering']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 2.5h<br /> **Total**: 41h/10000h

___

**Feature engineering** is the process of optimizing input variables in order to optimize the performance of ML models. This article should serve as a very brief and shallow introduction to some of the most used feature engineering mechanisms.

Let's look into some terminology first. Let's consider our dataset of labeled examples: $S = \{(x_i, y_i)\}_{i=1}^N$. Every element $x_i$ is called a **feature vector** --- it's a vector of **features**, which are items that describe the data point somehow, e.g. the price and mileage of a car. The $j$th feature of $x_i$ is denoted $x_i^{(j)}$.

There are two kinds of data that the machine learning models can find useful:
1. **Numerical data** - this could be the mileage of a car, or the salary of a person. This kind of data is numric in the sense that it has an inherent ordering --- the distance between two values can be quantified. Numerical data is also referred to quantifiable data.
2. **Categorical data** - data that is drawn from a finite collection of categories. For example, gender or ZIP codes. Note that ZIP codes can be mistaken as numerical data! Although the data can seem numerical, it doesn't have an inherent ordering.

Machine learning algorithms don't like categorical data; they only think in terms of numbers. So, we usually want to convert categorical data into a format that is more convenient for the model to use. We can transform categorical data into something called **binary data**, to avoid having the model create an artificial sense of ordering for the attribute. Let's look further into this.

## One-Hot Encoding

**One-hot encoding** is a process of transforming categorical data into binary data. How one-hot encoding works is it creates a binary attribute for every possible value of the categorical attribute.

Consider this as our example dataset:

| Name       | Address              | Zip Code | Age |
|------------|----------------------|----------| --- |
| John Doe   | 123 Main St          | 12345    | 25  |
| Jane Smith | 456 Oak Ave          | 67890    | 40  |
| Bob Johnson| 789 Pine Rd          | 54321    | 67  |

Let's encode the zip code into binary attributes with one-hot encoding. This is how the dataset will look afterwards:

| Name       | Address              | Age | Zip Code 12345 | Zip Code 67890 | Zip Code 54321 |
|------------|----------------------|------|-------|-------|-------|
| John Doe   | 123 Main St          | 25 | 1     | 0     | 0     |
| Jane Smith | 456 Oak Ave          | 40 | 0     | 1     | 0     |
| Bob Johnson| 789 Pine Rd          |  67 | 0     | 0     | 1     |

It matches every case and thus gives the data a more convenient format. This also ensures that the algorithm doesn't think there is an inherent ordering in the zip codes, although they seem numerical.

## Binning / Discretization

We can also convert numerical data into binary data. **Binning** (more officially known as **discretization**) does exactly that. It divides the numerical data into intervals or "bins". Let's see how this works. Imagine the previous dataset again, but slightly expanded:

| Name       | Address              | Zip Code | Age |
|------------|----------------------|----------|-----|
| John Doe   | 123 Main St          | 12345    | 25  |
| Jane Smith | 456 Oak Ave          | 67890    | 40  |
| Bob Johnson| 789 Pine Rd          | 54321    | 67  |
| Alice Brown| 321 Maple St         | 12345    | 15  |
| Charlie Lee| 654 Birch Blvd       | 67890    | 85  |

Let's do binning on the age attribute. It is essentially like one-hot encoding as well, so the following table will have a similar structure to the previously encoded table:

| Name       | Address              | Zip Code | Age 0-18 | Age 19-35 | Age 36-50 | Age 51+ |
|------------|----------------------|----------|----------|-----------|-----------|---------|
| John Doe   | 123 Main St          | 12345    | 0        | 1         | 0         | 0       |
| Jane Smith | 456 Oak Ave          | 67890    | 0        | 0         | 1         | 0       |
| Bob Johnson| 789 Pine Rd          | 54321    | 0        | 0         | 0         | 1       |
| Alice Brown| 321 Maple St         | 12345    | 1        | 0         | 0         | 0       |
| Charlie Lee| 654 Birch Blvd       | 67890    | 0        | 0         | 0         | 1       |

Why do we do binning? Well, it helps simplify the data for the machine learning models. It helps in noise reduction since the reduces the effect of outliers or minor variations since they are grouped into their own attribute.

## Normalization

**Normalization** is a procedure where we turn numeric data of an arbitrary scale to a common scale, such as all values in the range $[0, 1]$ or $[-1, 1]$. The point is to do this without distorting the differences of the values.

Normalization is great since it helps us achieve consistency between the different attributes. Imagine you had two attributes like age and income. Age would be in the range 0-100, and income in the range 0-1000000. Normalization makes these features easier to compare. The machine learning model may also give bias to features with larger values, so normalization helps prevent that as well.

There are two typical methods of normalization:
1. **Min-max normalization**. This rescales the values to fit a range from $[0, 1]$. It is mathematically defined as $x' = \frac{x - \min(x)}{\max(x) - \min(x)}$, where $x'$ is the scaled value and $\min(x)$ and $\max(x)$ are the minimum and maximum values in the dataset respectively.
2. **Z-score normalization** (otherwise known as **standardization**). The goal of this is to rescale the data so that it has a mean of $0$ and a standard deviation of $1$. It is mathematically defined as $x' = \frac{x - \mu}{\sigma}$, where $\mu$ is the mean and $\sigma$ is the standard deviation.

## Other Techniques
These techniques are brief to the point where they don't have to be gone over in great detail.

### Dealing With Missing Features
Some examples may missing features, and here are some ways to deal with that:
1. Remove the example with the missing feature
2. Use a **data imputation technique** for placing some value in place of the missing feature. For example, you can replace the missing value with the average value of that feature in the dataset: $\hat x = \frac{1}{N} \sum\limits_{i=1}^N{x^{(j)}_i}$.

### Forming New Features and Deleting Features
We can use two features and merge them into one feature to highlight their relationship. For example, height and weight can be combined into a BMI feature.

We can also delete features that may be irrelevant to the model to make the model simpler. For example, we often don't need the names of people in our dataset since they rarely have any meaningful correlation with any of the data.

## Conclusion
I think we've gone over the most frequently used feature engineering techniques now. There sure are more, but I think this fits the scope of the post well.

Further reading:
- [Chapter 5, The 100-Page ML Book (Andriy Burkov)](http://themlbook.com/wiki/doku.php)

--- Juho, https://vlimki.dev
