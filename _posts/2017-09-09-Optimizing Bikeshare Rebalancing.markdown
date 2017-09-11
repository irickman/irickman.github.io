---
layout: post
title: "Optimizing Bikeshare Rebalancing by Identifying High Priority Stations "
category : data viz
tagline: "Supporting tagline"
tags : [viz, biking, DC, Bikeshare, tableau, Bayes, data science]
date : 2017-09-08
---

<p class="intro"><span class="dropcap">F</span>or my capstone project to conclude my 12 week Data Science Immersive course at General Assembly, I studied Capital Bikeshare data to identify the highest priority stations for bikeshare rebalancing efforts. In this post, I'll walk through my workflow, methodology, and findings, to demonstrate the locations most sensitive to emptiness. These locations should be prioritized for rebalancing efforts. </p>

### What Is Capital Bikeshare?

Capital Bikeshare (CaBi) is a public bikesharing system offering bike rental service within the DC Metro area. The program offers bikes for rental (by single-ride or membership) at 347 stations in DC and Arlington, VA (and more in more distant cities). It was founded in September 2010 and has served over 14.5 million trips, all of which are publicly available for download in an anonymized format.

### What Is Rebalancing?
The CaBi system has over 7500 available bike docks across their stations, but has about 3500 bikes in circulation. Even with optimal distribution, the average station will be at 50% capacity. To combat this challenge and ensure bike availability, CaBi “rebalances” bikeshare stations by moving bikes to and from empty and full stations respectively. According to this [Washington Post article][bikes], CaBi aims to rebalance empty/full stations within 2 hours. However, knowing which stations will refill through user trips and which will remain empty is a very difficult process to model. Further, it's a pivotal calculation, since rebalancing is one of the largest operating expenses for CaBi. As such, figuring out which stations to prioritize for rebalancing is paramount.

### How Can We Measure Rebalancing Priority?
A key aspect of determining which stations to prioritize for rebalancing is understanding the unmet demand for bikes at stations that run out of bikes. While there is no current way to truly measure the number of people who are left tireless, we can try to infer the relative differences between stations, using the change in the rates of bike removal at neighboring stations. For example, in the situation depicted below, if the rate of bikes leaving the four outer stations changes when the center station becomes empty, we can infer that there is unmet demand at that station.

<figure>
<img src="{{ '/assets/img/Example Bikes.png' | prepend: site.baseurl }}" alt="">
<figcaption> The scenario on the left displays 5 stations with bikes vs. 4 stations without bikes and 1 without bikes on the right. </figcaption>
</figure>

Using the logic above, I set out to identify the stations that have differences in demand for bikes for when they're empty and not empty as **measured by the average number of bikes leaving the neighboring stations.**

### Data
To conduct my analysis, I downloaded the anonymized trip data available from [Capital Bikeshare][datasource]. I also accessed their publicly available API 


In my analysis, I built a Bayesian estimation model to determine the differences between empty and not for 229 of 357 DC and Arlington, VA bikeshare stations. I ended up with 87 stations that seemed to see an uptick in the number of bikes leaving neighboring stations as a result of emptiness at the origin station. In the visualization below, I display my findings.

<figure>
<figcaption> The visualization below shows bikeshare stations that should be prioritized for rebalancing </figcaption>
<iframe
  src="https://public.tableau.com/views/topublic/BikeshareExplorer?:embed=y&:display_count=yes"
  scrolling="no"
  width="2000px"
  height="1300px">
</iframe>
</figure>

### Recommendations
Based on my findings, I noticed that the highest priority stations were ones with a high number of neighboring stations, that run out more than average (but not the most), and have similar rates of bike trips starting and ending. These stations are more likely to see unmet demand when they run empty, as evidenced by an uptick in neighboring station bike trips, so they should be prioritized for rebalancing. In order the top 5 stations were:

1. 15th and F St NE
2. Maryland Ave and  E St NE
3. 15th and W St NW
4. California St and Florida Ave NW
5. 8th and 0 St NW

In my next post, I'll detail my study in depth and discuss the practical application and next steps for Capital Bikeshare.

[bikes]: www.washingtonpost.com
[datasource]: www.capitalbikeshare.com
