---
layout: post
title: "Exploring Capital Bikeshare's 2016 Data"
category : data viz
tagline: "Supporting tagline"
tags : [viz, biking, DC, Bikeshare]
date : 2017-09-04
---

<p class="intro"><span class="dropcap">I</span>n culmination of 12 weeks of immersive Data Science study at General Assembly, each student chose a capstone project to independently explore and demonstrate understanding of the many topics we learned. For my capstone, I chose to study which stations are the highest priority to replace with bikes, once the station is empty. As part of the data collection and analysis process, I explored trends in the data for the year 2016. In this post, I'll detail some of my findings. </p>

### The Data
Capital Bikeshare is a public bikesharing system offering bikes for rental (by single-ride or membership) at 347 stations in DC and Arlington, VA (and more in more distance cities). The company was founded in September 2010 and has served over 14.5 million trips. All of their data is publicly available and details all trips taken in an anonymized format. The dataset for 2016 contains 3 million trips with information on:

* Bike ID
* Start Station
* End Station
* Start Time and Date
* End Time and Date
* Rental Type (single-ride vs. member)

### Trends
After analyzing the data, a few key trends immediately became clear.

#### When People Ride
Wednesday was the most popular day for rides, and weekends were significantly less popular than weekdays.

<figure>
<img src="{{ '/assets/img/Day of Week.png' | prepend: site.baseurl }}" alt="">
<figcaption> The distribution of trips by day of the week </figcaption>
</figure>

Trips occur most frequently during the morning and evening rush hours, but slightly more in the evening than morning.

<figure>
<img src="{{ '/assets/img/Hour of Day.png' | prepend: site.baseurl }}" alt="">
<figcaption> The distribution of trips by hour of the day </figcaption>
</figure>

There are far more rides during the summer months than during the winter.

<figure>
<img src="{{ '/assets/img/Month of Year.png' | prepend: site.baseurl }}" alt="">
<figcaption> The distribution of trips by month </figcaption>
</figure>


#### How Long Trips Are
While about 80% of trips were taken by members, the length of trips between rental types varied significantly. For single-ride trips, the average ride was 41 minutes and was even higher on weekends.

<figure>
<img src="{{ '/assets/img/Casual Trip Time.png' | prepend: site.baseurl }}" alt="">
<figcaption> Average trip time for single-ride rentals </figcaption>
</figure>

Members averaged only 12 minutes, with more equality between weekends and weekdays.

<figure>
<img src="{{ '/assets/img/Member Trip Time.png' | prepend: site.baseurl }}" alt="">
<figcaption> Average trip time for member rentals </figcaption>
</figure>

#### Fun Facts
In addition to the visual data exploration above, I also uncovered a few fun facts:

* There were an average of 750 unique trips for each bikes
* There are an average of 17 docks per bikeshare station
* There were 4550 unique bikes used in 2016

### Conclusion and Next Steps
After looking at the data, I recognized that there's a huge difference between single-ride rentals and membership rentals. Further, I was surprised to learn that Wednesday is the most popular day, and even more surprised to learn that people prefer to ride home in the evening vs. to work in the morning. I imagine it's easier to go home after biking than to work. Using some of the information I gathered, I developed a capstone problem statement and was able to analyze my research question. A future post will detail the process used for my capstone in greater detail.
