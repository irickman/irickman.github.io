---
layout: post
title: "Two Years on WHOOP"
category : viz
tags : [whoop, python, api, fitness, data, tableau]
date : 2020-06-16
---

<p class="intro"><span class="dropcap">E</span>ach day, for the last two years, WHOOP has provided me with advanced analytics and insights on my body's strain, recovery, and sleep. WHOOP does a phenomenal job giving me the information I need to improve my performance, whether it's learning how to sleep better, train smarter, or take better care of my body. I know anecdotally that my behavior has changed as a result of WHOOP, but I wondered how much and in what ways. As a data-person, I decided to try to answer that question myself by downloading my data from the WHOOP website and visualizing it over time.</p>

<iframe
  style="border: 0px;"
  src="https://public.tableau.com/views/TwoYearsonWHOOP/Main?:embed=yes&:display_count=yes&:showVizHome=no"
  scrolling="yes"
  width="1440px"
  height="1000px">
</iframe>


## What is WHOOP?
[WHOOP][whooplink] was founded in 2011 by Will Ahmed, a former squash player at Harvard who constantly felt overtrained. He wanted more information about how and why his body performed well one day and poorly the next, so he built WHOOP alongside his co-founders. A WHOOP membership gets you a watch-sized wristband that monitors your body as long as you wear it. The wristband syncs with their app via bluetooth and provides advanced analysis on [strain][strainlink], [recovery][recoverylink], and [sleep][sleeplink]. The app shows you real-time data on things like heart rate and activity so you can keep track of how much stress you've put on your body over the course of your day. Each morning, the WHOOP app analyzes your sleep to generate a 0%-100% recovery score along with detailed sleep analysis. Based on your recovery score, WHOOP recommends a daily strain target to prevent over-training and keep your body fresh.

## How has my behavior changed on WHOOP?
Within a few months of joining WHOOP, I definitely started taking sleep more seriously. I discovered that I regularly spent an hour awake at night, meaning I wasn't getting as much sleep as I thought, and was sleeping significantly less than I should (yep  - WHOOP has a recommendation for that)! As a result, my recovery scores were pretty up and down.

WHOOP buckets recovery into three categories and their advice is pretty simple:
* **Red (0-33%)** - you should probably rest
* **Yellow (34-66%)** - you're ok to work out, but probably not too hard
* **Green (67-100%)** - go hard

During my first few months, I'd get a few greens here and there, but most of my recoveries were red or yellow. I wasn't following WHOOP's training advice because I had to prepare for my triathlon! I'd put together my training plan months earlier and couldn't afford to skip half my workouts for the week because WHOOP told me I was "in the red". Because I wasn't taking my recovery seriously, I thought red days were inevitable and that there wasn't much I could do to avoid them. I was training for a triathlon after all - of course I'd get run-down.

At the time, I was mostly just interested in having more data on my body and in knowing when to push harder in training. I knew that I typically felt better (and was likelier to be in the green) on weekends because I slept in, but getting more sleep during the week didn't seem like an option. **I wasn't treating sleep as something I had control over, so I wasn't putting my body in a position to succeed**. Over time, I realized that I was clearly wrong. Not only is it easier to just go to bed earlier, but there are other things within my control to [fall asleep and stay asleep][sleeptips]. While I certainly haven't done everything within my power to maximize my sleep, just thinking about it more has translated to more sleep.

<figure>
<figcaption> I've gotten more sleep, the longer I've been on WHOOP. Working from home during COVID-19 has certainly helped as well</figcaption>
<img src="{{ '/assets/img/Sleep Trend.png' | prepend: site.baseurl }}" alt="">
</figure>

As a result, I've significantly cut down on my red recoveries per month. Along with getting more sleep, taking rest days and hydrating better have made a huge impact on my recovery. While WHOOP only recently added the ability for me to track the effect of hydration, it's something I've felt for a while.

<figure>
<figcaption> Sleeping more has helped me cut down on my red recoveries</figcaption>
<img src="{{ '/assets/img/Red Trend.png' | prepend: site.baseurl }}" alt="">
</figure>

### Recovery
The biggest change to my recovery has been fewer red days. **Between my first year on WHOOP and my second, I went from averaging 11.2 reds per month to 6.9!**  While some of that is due to reduced training load, I believe the rest is attributable to changes to my sleep and recovery approach.

My fitness peaked in May 2019, at the end of my first year on WHOOP. My median HRV that month was 116, despite having only 9 greens to go along with 13 yellows and 9 reds. Even in a majority red and yellow month, my median HRV was so high because I averaged a 121.4 HRV for yellow recoveries in May. In comparison, during January 2019, I averaged a 115 for green recoveries alone, meaning **the same HRV in different months resulted in different recoveries!** This isn't uncommon because WHOOP's recovery formula adjusts for both short-term and long-term trends in HRV, but seeing the difference between the two months indicates that I was [much fitter][hrvlink].

In June and July 2019 my fitness tanked though. I went to Peru to hike the Inca trail and caught a pretty bad cold. Between the cold, elevation, and lack of sleep I came back to the US with a deep-chested cough and had to take three weeks off from training for the Berlin Marathon. Despite rushing to regain my endurance, just 12 weeks before the race, I was pretty close to peak form on race day and turned in a [great performance][berlin].

### Sleep
I slept more on average in my second year, despite a few months below my year one average. From May - August 2019 while training for the marathon, I didn't get enough sleep, even though I needed it more. Coming off that training cycle, the importance of sleep really clicked for me and over the last six months, I've focused on getting more. Interestingly, as I spend less time "in the red", my red recovery sleeps look more similar to my yellow and green sleeps. **My theory is that I'm no longer getting reds because of lack of sleep, but merely because my body needs a rest**.

I also noticed that my red recoveries seem to come in waves. In months with the most reds, my average sleep is lowest. **Undersleeping while carrying sleep debt begets even more sleep debt, making it even harder to fully recover**. In a later post, I'll look into this idea of cascading reds, but for now it seems that red recoveries don't occur in isolation. The behaviors that lead to red recoveries take a few days to fix - for example, I can't just catch up all my sleep in one night. I need to consistently hit my sleep goals to avoid reds.

Accordingly, on nights when I had more than an hour of sleep debt, I slept 42 minutes longer the next night in year two, compared against 33 minutes longer in year one. I also carried less sleep debt throughout the year as a result of better sleep performances. Mainly, I tried to focus more on sleep in my second year and it shows. In both years, I seemed to carry less sleep debt during the winter months, likely because I trained less during those times, but in my second year I was able to cut monthly average sleep debt from January - May almost in half.

Lastly, I was surprised to see that my quality of sleep actually went down in year two. Although I slept longer, I spent more time awake than in year one. **My suspicion is that I sleep more soundly through the night when I'm exhausted** than when I'm well-rested, so actually, trying to stay asleep longer is a good problem to have! While my REM % stayed consistent, I did see an increase in deep sleep %, which is a great source of restoration.

### Strain
My biggest change year over year was in strain. I started actually taking rest days and cut my red day workout rate from 59% to 48%. While my overall strain on red days still looked similar to or even higher in my second year, the combination of fewer red days and fewer red day workouts helped me stay fresher. I still did work out on red days, but I tried to take them easier than before. If I was scheduled for a long-run on the weekend and I woke up "in the red", I'd try to push it to the next day (or move it up a day if I woke up "in the green").

Interestingly, my average strain on green days decreased year over year, but I think that can be chalked up to just having more green days. It's hard to go hard every time I'm "in the green", but it did give me more flexibility. If I woke up "in the green" and I felt good, I might push the pace a bit more on a run than I otherwise would have.

The achievement I'm most proud of though, is the number of months in year two where my green recoveries were preceded by "under-strain" days. During those months, I had lots of greens and working out below the recommended amount was a big reason why. **Four of my top five "greenest" months were in the last year**, highlighted by January 2020, when I averaged 2.8 greens per week. Sometimes when I'm "in the green", I don't feel as good as WHOOP tells me I do, but during that month I felt pretty good almost every day. It was great, but obviously difficult to hold on to since getting green recoveries is harder as you get fitter.

### Training
My approach to WHOOP had a clear effect on my recoveries while training for races as well. In year one I trained for a triathlon over the summer, then in year two I trained for a marathon over roughly the same timeframe, but I had much better recoveries during marathon training. **I went from 40% red recoveries during tri training to 31% red recoveries during marathon training**. Additionally, I reduced the percentage of my weekly strain that came on red days so I was able to get more rest. With the exception of my trip to Peru, which I covered above, my Berlin training cycle tracked pretty well with what I'd hoped.

### Travel
One of my favorite things WHOOP has helped me understand is the effect of [travel][travellink] on recovery. I've always felt like I needed to run before I did anything else when traveling somewhere new. It turns out that's actually one of a number of great ways to adjust to changing time zones. Overall though, traveling is tough on the body, so I took a look at three trips where I flew over five hours to see how my body reacted. In all three trips my average recovery was much lower during travel than beforehand, **even though my sleep performance was roughly the same or better**. I was surprised to learn that my sleep quality seemed unaffected, while my restorative sleep (REM + deep) was inconsistent. After all three trips my sleep performance was much higher than before or during, but my recovery was inconsistent relative to pre and mid-trip.

## Conclusions
When I listen to WHOOP's podcasts, where athletes and fitness enthusiasts discuss their lives and how they use WHOOP, they always mention how quickly they took to it. They talk about how much they learn about sleep and how nice it is to have another way of viewing their fitness. I imagine this is true of most WHOOP users - you learn a lot in your first few weeks, then plateau for a bit as it becomes part of your everyday life. I went through this during my first year on WHOOP, but I've found there's also a second period of realization that takes longer to arrive and is much more impactful.

After being on WHOOP for two years, I've started to notice how my behaviors translate to my recovery. When I drink more water, I'm likelier to be "in the green". When I avoid using my phone 30 minutes before bed, I'm likelier to fall asleep fast and stay asleep through the night. When I avoid those one or two weeknight beers, I'm likelier to wake up feeling refreshed the next day. Using what I've learned, I could probably get pretty close to spending most days "in the green" if I lived in a perfectly controlled environment. Obviously I don't, but that's what's so great about WHOOP - **it gives you the information, and it's up to you how you use it.** By analyzing my data through this project, I've been able to see exactly how much I've used it and how my behavior has changed for the better.

[whooplink]:https://www.whoop.com/
[strainlink]:https://www.whoop.com/experience/#strain
[recoverylink]:https://www.whoop.com/experience/#recovery
[sleeplink]:https://www.whoop.com/experience/#sleep
[sleeptips]:https://www.whoop.com/thelocker/sleeping-tips-from-100-best-sleepers/
[hrvlink]:https://www.whoop.com/thelocker/what-is-a-good-hrv
[berlin]:https://www.strava.com/activities/2749973242
[travellink]:https://www.whoop.com/thelocker/the-effect-of-travel-on-sleep-and-recovery/
