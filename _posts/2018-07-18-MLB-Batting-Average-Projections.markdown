---
layout: post
title: "MLB Batting Average Projection Tool"
category : viz
tagline: "Supporting tagline"
tags : [viz, baseball, tableau, google sheets, python, statcast]
date : 2018-07-06
---

<p class="intro"><span class="dropcap">A</span>round this time each Major League Baseball season, games stop for the All-Star break and players get a chance to rest and reflect on the first half of their season. In some cases it can be a chance to reset following a poor first half, while for others it's a chance to double down and continue stroking. For every hot start that cools in the second half (Ryan Zimmerman 2017) there's a cool start that heats up (Kevin Kiermaier 2017).</p>

In honor of this year's All-Star Break, I've put together the visualization below to help project batting averages for every MLB player. Using the Tableau visualization below, you can see how a player's first half batting average trended as the season went on. Then, using the parameters on the right side, project how his batting average might change over the rest of the year. There's also some notable stats on the average a player would need in the second half to hit .300 or hit at their team's average. Here are some of the more notable ones (assuming 4 ABs per game unless otherwise noted):

* Bryce Harper would need to hit .406 to reach .300 by the end of the season
* Mookie Betts can hit .232 and still finish at .300
* Mike Trout can hit .157 and finish the season on par with the Angels' .243 team average
* Assuming a 1 AB per game average (to account for pitching every fifth day) Max Scherzer needs to hit .328 to finish the season at .300

### How I Built It

Developing the MLB Batting Average Projection Tool was much more difficult than I anticipated. I knew I could get data from MLB's Statcast tool and I knew I could automatically update and refresh my visualization each day, using a Mac OS LaunchDaemon, python, Google Sheets, and Tableau Public, but getting the data formatted and synchronizing the updating schedule took some configuration. To begin, I found a nifty packaged called [pybaseball][pybaseballlink], which allowed me to download data from [MLB's Statcast search][statcastlink], which tracks pitch-by-pitch data for every MLB game. From there, I filtered for events resulting in the end of a plate appearance and determined whether the plate appearance counted as an at bat and whether it ended in a hit.

Following a bit more formatting, I combined my data cleansing code with my data downloading code, to automatically add new game data to existing data. I then added each team's remaining schedule, again, using the pybaseball package, to create a dataset of each player's hits and at bats per game and their team's remaining games. Next, I uploaded the data to Google Sheets and then wrote a [LaunchDaemon][ldlink] to automatically repeat this process each day (assuming I open my computer).

Once I had the data in Google Sheets, I created a Tableau Public visualization connected to the Google Sheets data and started creating my sheets. While most of it was pretty straightforward, the most interesting challenge I encountered in Tableau was developing the running sum calculation, which keeps track of aggregate batting average over time. After playing around with a few table calculation options, I got it working. Lastly, I added the parameter calculations and put some formatting touches in place before finally publishing to Tableau Public.

<iframe
  style="border: 0px;"
  src="https://public.tableau.com/views/MLBBattingAverageProjectionTool/PlayerProjectionTool?:embed=y&:display_count=yes&publish=yes"
  scrolling="no"
  width="1000px"
  height="1000px">
</iframe>


### Potential Improvements

I'm pretty pleased with the product as it stands. Except for a few minor quirks, like projecting batting averages for pitchers and instances of negative batting average projections (because a player's average is so high, he couldn't possibly end the season below a certain average), I think it's a pretty neat tool. Besides adding additional rate stats (it's not too exciting to project home runs), the only other improvement I might make is developing a model to actually project a player's end of season batting average. That's a pretty big ordeal though and Steamer/ZIPS do a pretty good job already, so we'll see if I get to it. I've enjoyed playing around with the tool thus far and I hope you will too!


[zimespn]: http://www.espn.com/mlb/player/splits/_/id/6389/year/2017
[kevespn]: http://www.espn.com/mlb/player/splits/_/id/31446/year/2017
[statcastlink]:https://baseballsavant.mlb.com/statcast_search
[pybaseballlink]:https://github.com/jldbc/pybaseball/blob/master/docs/playerid_reverse_lookup.md
[ldlink]:https://medium.com/@fahimhossain_16989/adding-startup-scripts-to-launch-daemon-on-mac-os-x-sierra-10-12-6-7e0318c74de1
