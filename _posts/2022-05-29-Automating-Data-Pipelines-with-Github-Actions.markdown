---
layout: post
title: "Automating Data Pipelines with Github Actions"
category : viz
tags : [python, github actions, google sheets, data, tableau]
date : 2022-05-29
---
<p class="intro"><span class="dropcap">I</span> have been interested in moving one of my existing data pipelines from Google Cloud to Github Actions for a while now, but my recent bout with COVID finally provided me some downtime to get it done. In this post, I walk through the process I used to set up a recurring workflow using Github Actions, run a script, and authenticate to Google Sheets.</p>

In a previous [post][previouslink], I detailed my workflow for automating a data pipeline using Google Cloud to populate Google Sheets. While that process was cool and interesting, it was costing me about $10 a year to maintain between storage and compute. While that's not very much, I figured it was time to cut the costs, simplify, and streamline the process by moving to Github Actions (which is free at my usage level)! 

The complete workflow can be found on my [github][githublink], but in short I made the following changes. 
1. Stored my Google Service Account credentials in a [Github Secret][secretlink].
2. Generated a requirements.txt.
3. Modified my python script to take in the credentials. 
4. Developed a YAML file that aligned with the [Github Actions][actionlink] expected format.

The whole process was relatively straightforward. I followed a [tutorial][tutoriallink] for the main YAML file structure, then modified it slightly for my use case. The most difficult step was storing and reading the Service Account credentials from my Github Secrets, since the credentials are stored in a JSON format and I couldn't get the Github Workflow to properly read the JSON. 

Luckily, there is a wide network of Github Actions "packages" that have been created and I found the wonderful [create-json][jsonlink], which allowed me to successfully read and pass the credentials. This step creates a JSON credentials file from the secret, then stores it in the temporary virtual machine that's used to process the workflow. In my script, I simply read in the credentials JSON file, then authenticate to google sheets using the [pygsheets package][pygsh] and write to Google Sheets.

The result of my updated workflow is a Tableau Dashboard that allows users to project a player's batting average through the rest of the season. I've linked to it [here][mlblink] if you want to check it out!


[previouslink]:https://www.irarickman.com/blog/Autorefreshing-Tableau-Through-Google-Cloud-and-Sheets/
[githublink]:https://github.com/irickman/mlbprojections
[actionlink]:https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
[secretlink]:https://docs.github.com/en/actions/security-guides/encrypted-secrets
[tutoriallink]:https://canovasjm.netlify.app/2020/11/29/github-actions-run-a-python-script-on-schedule-and-commit-changes/
[jsonlink]:https://github.com/marketplace/actions/create-json
[pygsh]:https://pygsheets.readthedocs.io/en/stable/authorization.html#service-account
[mlblink]:https://public.tableau.com/app/profile/ira.rickman/viz/MLBBattingAverageProjectionTool/PlayerProjectionTool