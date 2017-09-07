---
layout: post
title: "Building a Premier League Clustering Model: Part II"
category : clustering
tagline: "Supporting tagline"
tags : [viz, epl, soccer, premier league, clustering, data science]
date : 2017-08-22
---

<p class="intro"><span class="dropcap">F</span>or the second post in my three part series on constructing an EPL team selection tool, I'll detail the modeling approach I used to cluster teams. When I originally set out to match MLB teams to Premier League teams, I decided to use unsupervised learning. Although I could have used a supervised learning technique to predict which EPL team matched each MLB team, I decided against that approach for reasons I'll dtail below. </p>

### Modeling Approach
Unsupervised learning involves grouping data without knowing which group it belongs in. We commonly refer to this as our prediction variable. When performing more traditional data science, we know what class we want to predict. For example, if I want to predict which MLB teams make the playoffs, I'll build a model using the historical stats of teams that did and did not make the playoffs. In this case, since we don't already know how MLB teams and EPL teams are similar, we don't already know what we want to predict.

While it's true I could build a model to predict MLB teams based on the data I collected, then apply this model to Premier League teams, I feared three downsides:

1. I might not be able to accurately predict MLB teams, which would result in a bad model for EPL teams
2. Since there are 30 MLB teams, even with a perfect 1:1 match, 10 MLB teams would not have a companion EPL team
3. Given the nature of sports leagues, there are often many middle of the pack teams, so predicting based on my data might have assigned a significant number of teams to a small number of teams.

For these reasons, I decided to rely on unsupervised learning, to instead group "like" MLB teams, then apply that model to EPL teams to see how they fit the groupings. Performing this sort of grouping proved challenging as well, as I'll detail further.

### Building a Clustering Model

While there are a few forms of unsupervised learning techniques, I decided to focus on clustering. Clustering involves grouping observations based on the distance between each of their variables. There are different ways to determine the groupings, but in general, we measure the effectiveness of clustering by the density of clusters (how close the observations in each cluster are to each other) and the distance between clusters (how far the clusters are from each other).

When clusters are easily separable, this can be simple, for example, grouping EPL players by their positions. Based on stats on where players spend time on the pitch, it will likely be easy to classify players into positions. However, for data without easily separable clusters, it can be challenging to separate classes in a meaningful way.

To build my clustering model, I tried three approaches: K-Means Clustering, DBSCAN, and Hierarchical Clustering.

#### K-Means Clustering
K-Means Clustering works by grouping clusters based on the distance from some number k points, then iterating until the optimized distance between points is achieved. In K-Means clustering, you select exactly how many groups you want, and the model will separate them for you. Since I didn't know exactly how many groups made sense, I tried varying numbers until I found a number of clusters that did a good job of separating the data, but balancing cluster density. K-Means gave me 8 clusters, which seemed to be a good method of dispersion.

#### DBSCAN
DBSCAN stands for Density-based spatial clustering of applications with noise and is another clustering technique. DBSCAN arrives at a number of clusters using its algorithmic approach measuring the distance between observations and other observations. When observations are within the radial distance of other observations and meet a minimum neighboring threshold, they are grouped into the same cluster. When one cluster runs out, the algorithm generates a new cluster. This process continues until every observation has been clustered or determined to be too far from other observations to assign to a cluster. I tried varying inputs for the radial distance and minimum number of points for MLB teams, but wasn't able to group teams to more than 3 groups.

#### Hierarchical Clustering
In Hierarchical Clustering, a mapping of the distances between each observation and the other observations is created. This web is organized into a decision tree-like graph, that converges with each observation grouped together at it's end. This graph is called a dendogram and helps visualize how far each observation is from the other points. From there, you select where to draw the distinction between groups, and much like in K-Means Clustering, you can separate clusters based on a number. However, with Hierarchical clustering, you specify a distance, which can somewhat arbitrarily leave observations in disparate groups. Furthermore, Hierarchical Clustering typically works best in situations where there is a distribution between observations. For example, if we wanted to cluster all English clubs that participate in the FA Cup, we might use Hierarchical Clustering, since it would better group the clubs in each division.

### Choosing a Clustering Model
After running through each model, I decided to go with K-Means with a k of 8. K-Means ensured the best spread of clusters with the most practical application. While the density and separation metrics may have been slightly better with other ks and other techniques, they are ultimately guidelines, not rules. With that in mind, 8 clusters did the best job of separating as many MLB teams and EPL teams as possible.

While unsupervised learning can sometimes be inexact, my groupings certainly pass the eye test (Yankees and ManU) so I feel confident in their conclusiveness. In the last post in this series, I'll detail how I created the accompanying Tableau visualization.
