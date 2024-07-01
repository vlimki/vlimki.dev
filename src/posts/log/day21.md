---
title: "Day 21 of Machine Learning"
description: "Learned Haskell and implemented gradient descent."
published: true
date: '2024-06-28'
slug: 'day21'
post: false
tags: ['log']
---
<script>
    import Image from '$lib/components/Image.svelte';
</script>

**Time spent**: 3h<br /> **Total**: 57h/10000h

___

Yesterday's gradient descent code had quite a bit of bugs. They're all fixed now though:

```haskell
xs = [1,2,3,4,5]
ys = [1,4,9,16,25]

f :: (Floating a) => a -> a -> a -> a
f w x b = w * x + b

w = 0.123
b = -0.123
lr = 0.1

mse :: (Floating a) => [(a, a)] -> a -> a -> a
mse dp w b = (1 / (2 * fromIntegral (length dp))) * sum loss
    where
        pred = [f w x b| (x, _) <- dp]
        loss = [(y - prediction) ** 2 | ((_, y), prediction) <- zip dp pred]

gradW :: (Floating a) => [(a, a)] -> a -> a -> a
gradW dp w b = -(1 / fromIntegral (length dp)) * sum loss
    where
        pred = [f w x b | (x, _) <- dp]
        loss = [(y - prediction) * x | ((x, y), prediction) <- zip dp pred]

gradB :: (Floating a) => [(a, a)] -> a -> a -> a
gradB dp w b = -(1 / fromIntegral (length dp)) * sum loss
    where
        pred = [f w x b | (x, _) <- dp]
        loss = [y - prediction | ((x, y), prediction) <- zip dp pred]

step :: (Floating a) => [(a, a)] -> a -> a -> (a, a)
step dp w b = (w - w_grad * lr, b - b_grad * lr)
    where
        w_grad = gradW dp w b
        b_grad = gradB dp w b

train :: (Floating a) => Int -> [(a, a)] -> a -> a -> (a, a)
train 0 _ w b = (w, b)
train epochs dp w b = train (epochs - 1) dp new_w new_b
    where (new_w, new_b) = step dp w b
```

This is so much better than Python.
