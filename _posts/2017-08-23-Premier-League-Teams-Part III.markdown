---
layout: post
title: "Building a Premier League Clustering Model: Part III"
category : clustering
tagline: "Supporting tagline"
tags : [viz, epl, soccer, premier league, clustering, data science]
date : 2017-08-23
---

<p class="intro"><span class="dropcap">I</span>n the final post in my three part series on constructing an EPL team selection tool, I'll detail the process used to create the visualization in Tableau and the stylistic choices I made to improve the user experience. Given that I have a background using Tableau, I knew it would be my go-to for displaying the results of my clustering analysis. Below I explain the creative process and the steps I took. </p>

### Visualization Structure
Given that the teams in my analysis are based in cities, I knew I wanted to incorporate a map in some way. While people often want to use maps because they think they're cool (which let's be real is true), it's important to consider if it will actually add to the analysis. In this case, I considered using maps for both MLB and EPL. However, I decided to use a map only for the EPL and not the MLB, with my rationale being that for my audience of MLB fans, using a map of the US would not add any new information, but a map of the UK would. Knowing exactly where an EPL team is located visually, adds an important element of information that can help a user better understand the team they've selected.

Since the EPL teams are meant to be the focus of the visualization, but need to be narrowed through the MLB teams, I made sure they consumed the majority of the space. The bottom three quarters of the visualization feature the EPL teams, with the middle two quarters, dedicated to team exploration. With the top quarter, I decided to display MLB teams in a scrollbar style, to simplify the experience for the user and clearly indicate that selecting an MLB team would flow down screen to narrowed choices for EPL teams. Choosing an EPL team in the map, provides a tidy overview of the club and it's characteristics in the left side bar, and allows a user to quickly learn about clubs. Lastly, the live table at the bottom provides additional context on the quality of the selected club.

### Building the Visualization
To construct the visualization, I had two main time-consuming tasks. The first was connecting logos to teams from both leagues and the second was displaying the geographical locations of each club in a meaningful way.

#### Showing Team Logos
To address the logos challenge, I had to save each logo to the folder on my computer that contains Tableau Shapes (Documents/My Tableau Repository/Shapes), then assign them appropriately.

<img src="{{ '/assets/img/MLB Logos.png' | prepend: site.baseurl }}" alt="">

I went through a similar process for the EPL teams, with one additional step. To display the team logos in their own sheet, in high resolution, for Tableau Public, I had to set the logos as the background, conditional on the selection. To do this, I created calculated fields "X" and "Y" and set them equal to 1. Next, I went to Map>Background Images and selected my data source. When the menu popped up, I selected "Add Image" and began the process of adding each team logo. To add a logo, I added the file by clicking "Browse" and linking to the file. then I added the calculated field "X" to the X field axis and "Y" to the Y field axis. I set the minimums equal to 0 and maximums equal to 1. This ensures that background image scales properly. Lastly, I clicked on "Options", and checked "Always Show Entire Image", then hit "Add". There, I chose the EPL team field, and chose the team for my selected logo. This ensured that that specific logo, only shows when that specific team is selected. I proceeded to complete these steps for each team until I had all the logos set up.

<img src="{{ '/assets/img/Liverpool.png' | prepend: site.baseurl }}" alt="">


#### Displaying Geographical Location
While many of the teams had their city attached to them, for a few cities, the location was ambiguous or overlapped another team. For example, in London there are 6 teams in the greater metro area. To display their logos without overlapping each other, I manually entered the latitudes and longitudes of each stadium, ensuring that the logos wouldn't overlap each other. To do this, I clicked on Map>Edit Locations, then manually inputted the coordinates for the appropriate stadiums.

<img src="{{ '/assets/img/Locations.png' | prepend: site.baseurl }}" alt="">

### Updating the League Table
The last step to complete my visualization was setting up the live data table. It's not truly live, but it can be updated very quickly, without downloading any new data. Thanks to the fantastic Tableau Web Data Connector functionality and Import IO, I was able to connect to the [Fox Sports Premier League Standings][standings] and with a click of the refresh button, update the standings each week.

### Conclusion
The entire project took me the better part of two weeks to complete, with much of my time spent on data collection and preparation. While it was time intensive, I thoroughly enjoyed the process and challenge. Further, I learned a few cool pandas tricks and honed my web scraping skills. I also learned a great deal about clustering, which will serve me well in the future. Lastly, I always enjoy working in Tableau and this time was no different. Each time I use it, I get better at structuring my visualizations and adding new features.

As mentioned previously, MLB is only the first league I plan to incorporate and I hope to update this post in the future with a new post on teams from another Big 4 American Sports League.

[standings]: http://www.foxsports.com/soccer/standings?competition=1
