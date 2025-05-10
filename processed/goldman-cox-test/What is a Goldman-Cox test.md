Recipe
Perform a Goldman-Cox test

### What is a Goldman-Cox test?

Nick Goldman explains the Goldman-Cox (GC) test in [this paper](https://link.springer.com/article/10.1007/BF00166252)

The basic idea is that we are asking whether the _full_ model (i.e. the tree, branch lengths, model parameters, _everything_ we estimate from the data) is an adequate description of the data. We do this by calcualting the _cost_ of the model, which is just: the maximum liklelihood of the data under the model, minus the _unconstrained_ likelihood (see below). We'll call this _delta_. You can read Nick's paper for a full description of this, but he puts it rather nicely on page 184:

```
[delta] can be considered the "cost" of using [our model assumptions] to make 
inferences about phylogeny. A low cost indicates that [our model] is adequate; 
a high cost indicates that [our model] is performing badly and should be rejected.
```

> Be warned! For most datasets, you will reject the full model. This is simply because most modern datasets are large, and most of our models of evolution are still really simple. So we should _expect_ to reject them. This doesn't mean they don't produce useful inferences, of course!


Calculating the cost of the model is easy, but to interpret it we need to know if the cost is surprisingly large or small. That is, we need some idea of the null distribution of costs. One way to do this, and the method used by the Goldman-Cox test, is to use a parametric bootstrap. A parametric bootstrap is a _really_ useful way to ask questions in phylogenetics. The absolute classic paper on this is from [Goldman, Anderson, and Rodrigo in 2000](https://academic.oup.com/sysbio/article/49/4/652/1678908). You should read this first. There are many flavours of parametric bootsrap in phylogenetics, but they all follow the same pattern:

1. Do an analysis on your focal dataset (probably your empirical dataset), and measure the thing you're interested in (here it's delta)
2. Call the model you estimated from your empirical dataset the null model, then simulate a lot of new datasets using that null model
3. Measure the thing you are interested in on each of the simulated datasets (here it's delta)
4. Ask if your observed value (from step 1) is surprising given the list of simulated values (from step 3)

In other words, for the Goldman-Cox test we can figure out if our observed cost is high, by simulating lots of cost values under the null model, and then re-calculating the cost on those. That null distribution tells us what kind of cost values we should expect when the null model is true. And so it then allows us to ask whether our observed value looks plausible. If you're a biologist and you like working with an alpha value of 5%, you might consider that if your observed cost is in the highest 5% of the simualted costs, you should reject your model as inadequate.

The Goldman-Cox test doesn't (and can't) tell you which aspects of your model might be causing the most trouble. But it's a really good place to start when considering how well you are able to to model your data.