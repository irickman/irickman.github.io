---
layout: post
title: "Visualizing the Bikeshare Stations in Greatest Need of Rebalancing"
category : data viz
tagline: "Supporting tagline"
tags : [viz, biking, DC, Bikeshare, tableau]
date : 2017-09-08
---

<p class="intro"><span class="dropcap">T</span>his post offers a quick breakdown of some of the key findings and insights from my capstone study on the highest priority stations for bikeshare rebalancing efforts. Because Capital Bikeshare has about twice as many docks as bikes, they "rebalance" their docks by moving bikes from full stations to empty stations to redistribute the location of bikes. In a later post, I will more comprehensively detail my methodology and capstone approach, but here I simply mean to display my findings and cover some interesting recommendations. </p>

### The Findings

For my capstone, I looked at the bikeshare stations that have differences in demand for bikes for when they're empty vs. not, as **measured by the average number of bikes leaving the neighboring stations.** In my analysis, I built a Bayesian estimation model to determine the differences between empty and not for 229 of 357 DC and Arlington, VA bikeshare stations. I ended up with 87 stations that seemed to see an uptick in the number of bikes leaving neighboring stations as a result of emptiness at the origin station. In the visualization below, I display my findings.

<figure>
<figcaption> The visualization below shows bikeshare stations that should be prioritized for rebalancing </figcaption>
<iframe
  src="https://public.tableau.com/views/topublic/BikeshareExplorer?:embed=y&:showVizHome=no"
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
