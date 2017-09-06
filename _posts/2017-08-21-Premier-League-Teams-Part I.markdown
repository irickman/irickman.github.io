---
layout: post
title: "Building a Premier League Clustering Model: Part I"
category : clustering
tagline: "Supporting tagline"
tags : [viz, epl, soccer, premier league, clustering, data science]
date : 2017-08-21
---

<p class="intro"><span class="dropcap">I</span>n my previous post, I introduced my Premier League Team selection tool, used to match MLB fans with Premier League teams. In this first post of a three part series, I detail the data collection, analytical approach, and visualization techniques I used to create the visualization. </p>

### Initial Data Collection
To perform this analysis, I collected data on the following characteristics of both EPL and MLB teams:

* Weighted average of team record for the past 25 years
* Number of titles and runner-up finishes in team history
* Number of player awards won in team history *(EPL: PFA Player of the Year and Young Player of the Year, MLB: MVPs and Cy Youngs)*
* Age of Stadium
* Stadium Capacity
* Average price of a beer at the stadium
* Previous season's offensive and defensive metrics *(EPL: Goals Scored/Allowed, MLB: Offensive WAR and Pitching WAR)*

Gathering data and cleaning it for analysis proved to be the most time consuming aspect of this project. Since I set out to compare MLB teams to Premier League teams, I wanted to ensure consistency of data and continuity of observations. I gathered most of my baseball data from BaseballReference.com, Wikipedia, and a study on MLB fan costs. Most of my EPL data came from Wikipedia, PremierLeague.com, and a Daily Mirror fan cost study. I used a combination of data downloads and web scraping to gather the data.

### Data Preparation

After gathering all of the data, I had to perform a considerable amount of data cleaning and transformation to get it into a solid state for analysis. One major challenge was handling missing seasons in the previous 25 years for both MLB teams (as a result of expansion) and EPL teams (as a result of promotion/relegation). To handle these seasons, I simply gave these seasons the minimum team win percentage in baseball and the minimum number of points in EPL in their respective leagues. Next, I put all team names in a standard format and converted to the appropriate data type. Once I'd finally gotten the data in the right formats, I merged them all together to create a dataframe for MLB teams and one for EPL teams. With my prepared data frames in place, I was ready to perform data analysis.

My next post in the series will detail the approach I used to build my clustering model.
