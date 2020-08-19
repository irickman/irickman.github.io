---
layout: post
title: "Automatic Data Updating in Tableau Public"
category : data viz
tags : [viz, google cloud, tableau, python, launchctl]
date : 2017-12-07
---

### Updated Post
**I've put together an update to this post that leverages Google Cloud Compute, Google Cloud Scheduler, and cron to truly automate this process**. While the process below works well if you keep your computer on for each scheduled launch daemon, it doesn't work well for data that needs to be refreshed more regularly or during off-peak hours. The updated approach does a better job handling these situations and can be found [here][updatelink].

<p class="intro"><span class="dropcap">I</span>n a previous post, I introduced my Premier League Team Selection Tool, which used MLB team allegiance to suggest Premier League clubs based on a k-means clustering exercise. I was really happy with the final product, except for one glaring issue. I included a Premier League Table at the bottom of the viz, meant to be as close to live as possible. In reality, it required a manual update each game week, which defeated the purpose of it being "live".</p>

As a result of Tableau Public's composition, each time I wanted to update the league table, I'd have to sign in, update the workbook, then reupload it to Tableau Public. Given that my interest in coding was spurred by a desire to eliminate my repeatable tasks, I figured this was just another task to automate. My solution ended up being three parts: Finding a Data Source, Getting Tableau Public to Refresh Automatically, and Scheduling it to Update Weekly.

### Finding a Data Source

My old process used an Import.IO web connector to scrape data from Fox Sports' EPL page. However, Import.IO discontinued their web connector, so I had to find a new data source. While frustrating, it ended up being a blessing in disguise, as I discovered the wonderful [football-data.org][footie] API. After some testing and implementation, I had a python script that automatically pulled down the latest premier league standings and fixture lists, then stored them in CSVs. I used those CSVs to replace my previous data sets in Tableau Public, then set about the process of getting Tableau Public to automatically refresh.

### Getting Tableau Public to Refresh Automatically

I initially tried to find a way to automate my computer, using keyboard commands, to autorefresh Tableau Public. After some extensive googling, I couldn't find an easy way to do it, so I sought alternatives. I read about Tableau's Google Sheets API and immediately knew it was the move. Unlike many other Tableau Public connections, the Google Sheets API refreshes every day at 11 am. Since it just pulls the latest data from Google Sheets, if I could figure out a way to keep Google Sheets up to date, I'd have my solution.

Luckily, I came across this [post][pyg] from Erik Rood, that explained how to connect Python to Google Sheets. After downloading the pygsheets package, reading his tutorial, and fiddling with the code, I was able to join my google sheets update code with my football-data API collection code, to make one script capable of doing it all. Once I was able to reliably push my weekly EPL data to google sheets, I replaced the CSV files in my Tableau Public workbook, with the google sheets connection and was just about ready to go.

### Scheduling it to Update Weekly

The final step to make the process truly automated, was scheduling my python script to run automatically. After some searching, I determined that Launchctl would likely be a more robust solution than Crontab, because of it can run ["missed scripts"][miss], scheduled while my computer is asleep. I found a tutorial on [launchd.info][launchcd] describing how to create the file and the different intervals available, then wrote my own to update twice a week, after mid-week and weekend fixtures. I excitedly went to run it, only for it to fail. I tried a number of different troubleshooting methods (shebang lines, working directories, python environments) without success. After a good number of hours, I finally came across this informative [tutorial][sudo] which suggested using "sudo" to schedule my launch daemon. Once I got it up and running, I watched in delight as my process flowed from start to finish, leaving me with a Tableau Public workbook, sporting the latest Premier League Standings.

### Conclusion

While it only took a few months to get it there, I'm happy to announce the table in my Premier League Team Selection Tool gets automatically updated on a weekly basis. While it may seem trivial, it was a great learning experience, and a highly applicable skillset for future use.

[footie]: www.football-data.org
[pyg]: http://erikrood.com/Posts/py_gsheets.html
[launchcd]: http://www.launchd.info/
[sudo]:https://alvinalexander.com/mac-os-x/mac-osx-startup-crontab-launchd-jobs
[miss]:https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/ScheduledJobs.html
[updatelink]:http://www.irarickman.com/Automatic-Tableau-Data-Refreshing-Through-Google-Cloud-and-Sheets/
