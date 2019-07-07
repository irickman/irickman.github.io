---
layout: post
title: "Which Premier League Team Should You Support?"
category : clustering
tagline: "Supporting tagline"
tags : [viz, epl, soccer, premier league, clustering, data science]
date : 2017-08-20
---

<p class="intro"><span class="dropcap">T</span>he English Premier League (EPL) is back for the 2017-2018 season, so to honor the occasion, I've put together a visualization to help prospective fans select a team to support, based on American professional team allegiance. To align American teams to EPL teams, I used an unsupervised learning technique called K-Means clustering, to group like teams. For the first league in the series, I decided to start with Major League Baseball (MLB), since it's currently ongoing, but I hope to soon follow with the NFL, NBA, and NHL. For now, enjoy learning about the wonderful world of Premier League football, through the lens of the MLB. </p>

<figure>
<figcaption> Select an MLB team below to see which EPL teams it was paired with, based on the characteristics listed below. Some teams have multiple options, so choose one you like!<br/>Apologies to Dodgers fans, your team is so special, they didn't match with anyone! </figcaption>
<iframe
  style="border: 0px; font-family: 'PremierLeague';"
  src="https://public.tableau.com/views/PremierLeagueViz/FindingaPremierLeagueTeam?:embed=y&:showVizHome=no"
  scrolling="no"
  width="2000px"
  height="1300px">
</iframe>
</figure>


### Takeaways

To perform this analysis, I collected data on the following characteristics of both EPL and MLB teams:

* Weighted average of team record for the past 25 years
* Number of titles and runner-up finishes in team history
* Number of player awards won in team history *(EPL: PFA Player of the Year and Young Player of the Year, MLB: MVPs and Cy Youngs)*
* Age of Stadium
* Stadium Capacity
* Average price of a beer at the stadium
* Previous season's offensive and defensive metrics *(EPL: Goals Scored/Allowed, MLB: Offensive WAR and Pitching WAR)*

To transform this seemingly disparate set of data into meaningful team pairings, I used K-Means clustering to model the similarities between MLB teams, then apply the model to EPL teams. K-Means generated a set of "clusters" which enabled me to fit clusters based on MLB teams to EPL teams. I'll go into greater detail on my methodology in a later post, but after looking at the clusters, it seems that **previous season offensive/defensive metrics and the weighted average of team record** had the biggest influence on the matchups. While there are certain pairings that matched based off different factors (i.e. Chelsea, the Red Sox and Cubs - stadium age, Yankees and Man U - titles), many of the groupings were based on these factors. In most cases, the gaps between groupings is fairly small, and is likely attributable to the relative parity within the middle tiers of both leagues. Although I knew this might be the case, I had hoped for a more defined split and more narrow pairing of teams. In the end though, the results seem pretty sensible and provide the prospective fan with options.

One additional item of note is the idea of club culture. A few people suggested it to me when I first began this project. While the rich history of English clubs is certainly a significant portion of each club's identity, it is often tied to the club's geography. Given that I wanted to recommend teams to people with no ties to England, I felt it was not worth including a measure such as cost of living in this iteration. Further, since I plan to expand the approach to other sports, I was wary of pairing cities instead of pairing teams with similar histories. However, I'll continue to tinker with the idea for the next iteration.

In my next three posts, I'll detail the process I went through to build this visualization, but for now, enjoy and happy footballing!
