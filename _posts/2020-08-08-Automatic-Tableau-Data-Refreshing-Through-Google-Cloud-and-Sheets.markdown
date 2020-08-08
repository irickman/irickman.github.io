---
layout: post
title: "Automatic Tableau Data Refreshing Through Google Cloud and Sheets"
category : viz
tags : [python, google cloud, cron, data, tableau]
date : 2020-08-08
---
<p class="intro"><span class="dropcap">T</span>his post builds on my previous post on Auto Refreshing Tableau Public by introducing Google Cloud Compute and Google Cloud Scheduler. In my previous post, I explained how to connect a Tableau Public workbook to Google Sheets to take advantage of the daily Tableau Public-Google Sheet refresh. I described how to schedule a launch daemon locally to update the data contained within the Google Sheet, thereby refreshing the data in the connected Tableau Public workbook. While this setup works well for relatively infrequent refresh cycles, it does not work well for data that needs to be updated daily (or more frequently). The setup detailed below solves for this problem to create a truly automated data refresh procedure. </p>

## Why did I update my data refresh process?
While I was pretty pleased with my [original data refresh approach][initiallink] to update the Premier League table every week, I've since built Tableau dashboards that needed to be updated more frequently. For my [MLB Batting Average Projection Tool][mlbtableaulink], I needed to refresh the data on a daily basis for it to be relevant. Opening my personal computer every single day of the MLB season wasn't a great option, so I started looking around for a reliable task scheduling approach. I ultimately settled on the workflow below
1. Schedule an instance to run using Google Cloud Scheduler
2. Kick off a cron job within the instance to run my [code][mlbcodelink] to pull the updated data and load it to Google Sheets
3. Schedule the instance to stop running using Google Cloud Scheduler (to save money since it only really needs to be on for five minutes a day)

I considered using Google Cloud Scheduler to execute the script directly, instead of using cron in the instance, but I like having the instance to ssh into and I was already familiar with using a virtual instance, so it was the path of least resistance. I also considered using Airflow, which I use at work, but it would have required a similar scheduling setup and an extra layer of deployment with the web server. However, I am in the process of transitioning this process to Airflow, so I can more easily schedule new jobs in the future and will update with a follow-on post once complete.

## Getting started with Google Cloud
If you're setting up Google Cloud for the first time, I'd recommend following this [guide][gcpsetuplink]. First time users on Google Cloud get a $300 credit for the first year, though you must enable billing and fill in credit card information to use it. You can also use Google Cloud's [free tier][freetierlink], which has usage limits. The free tier limits your available memory and processing power, but you should certainly have enough to perform basic operations. I use the second smallest tier instance size for this script, but it's very cheap since I only run this for 5 minutes a day.

## Creating an instance
I use the same instance each time so I can store my code for repeated use. There is probably a better way to do it, but this was the most straightforward method way for me. To move code between my local machine and the instance, I use GitHub. Obviously GitHub makes version control easier, but it's also a much simpler way to move code than scp-ing (secure copying) from my local machine to the instance each time I need to update the script.

### Creating a project
To get started, you'll first need to create a new project, since Google Cloud organizes everything within projects.  To create a new project, go to the [project page][projectpagelink] and click "create project". You can name it whatever you want, but make sure it's something easy to type in case you end up referencing it from command line. After you've set up your project, you'll probably want to enable the Compute Engine API. Go to your project's console (the home page for your project - to get there click Google Cloud Platform in the upper left) and click on APIs. At the top of the next screen, click "Enable APIs and Services", then search for the Compute Engine API and add it.

### Launching an instance
After enabling the API, you can navigate back to console and click on the "Go to Compute Engine" link (if it doesn't appear, click on the sidebar icon in the upper left, scroll down and click on Compute Engine). When you land in the Compute Engine, you'll have the option to create an instance. Click "Create" to create your instance. You can give your instance a name (again, preferably an easy one to type), then select a region and availability zone. These are the Google Cloud server locations where you can host your virtual machine. The typical guidance is to choose a region close to you, but I don't think it matters *that much*. Your zone selection isn't particularly important either. However, **when you go to launch your instance, it will launch in that region, zone combination by default**. You can [move it][movinglink] across zones in case your default zone is down (which happens occasionally), but I've never needed this option.

After selecting your region and zone, you'll select your instance type. I use the series N1, machine-type g1-small. There are a whole bunch of options based on your computing needs. The g1-small has served me well for this and other efforts so I've kept it!

<figure>
<img src="{{ '/assets/img/GCP Image.png' | prepend: site.baseurl }}" alt="">
</figure>

From there, you'll want to click "Allow full access to Cloud APIs" under Access Scopes. This will ensure your instance can be scheduled to start and stop. Lastly, you'll want to allow HTTP and HTTPS traffic. You'll need them to run a script that gets data from somewhere, then stores it in Google Sheets. You can change these options later, but it's easier to set them up from the start. Once your instance is set up, you can launch it by clicking on the instance, then hitting start!

## Setting up your instance

To connect to your instance, you can either open the connection in a new window, follow one of the other options to open it in browser, use another ssh client, or connect through gcloud (the Google Cloud command line interface).

<figure>
<img src="{{ '/assets/img/Connection dropdown.png' | prepend: site.baseurl }}" alt="">
</figure>

I use a mix of Console and gcloud to work with Google Cloud, but you can comfortably use either. However, when connecting to instances, I prefer gcloud so I can interact with them more natively. To install gcloud, follow the instructions [here][gcloudlink]. To connect to your newly created instance through gcloud, you can either [type out the command][gcpinstancelink] in your local terminal or copy the command from the dropdown and paste it into your local terminal. If you aren't sure if it worked, **you'll know you're in your instance if you see that your terminal lists your location as** \<your google username>@\<your instance name> (for me that's irarickman@instance-1). Congrats, you're now in your virtual machine!

### Installing packages and tools
For my specific use case, I needed to set up a few things to get it ready to run my MLB data refresh script. Your own setup may differ depending on your needs, but I needed the following

1. **Python packages** - Your VM should come with Python. If it doesn't, follow step two
    1. Run **sudo apt update**
    2. (If you don't have python) Run **sudo apt install python3**
    3. Run **sudo apt install python3-pip** to install the latest pip
    4. Install any packages you need via pip3. For me this was mainly pybaseball, pygsheets, and a few smaller ones.
2. **Install Git and clone your code repo** - If you don't have Git installed already, follow the steps below. This assumes you want to pull code from Github or Gitlab. If not, skip this step!
    1. Run **sudo apt install git**
    2. Clone your repo as you normally would! I used https auth, which may prompt you for your username and password. If you use SSH, you'll need to go through the normal ssh keygen set up.
3. **Create a Google Sheets API app and connect to it** - To avoid recreating another tutorial, I recommend following Erik Rood's excellent [Google Sheets API setup][gsheetsapilink]. After you've set up your credentials, you will want to secure copy them into your instance for use.
    1. To secure copy, open a new terminal tab so you're back in your local directory and run
    **gcloud compute scp \<file_path>/client_secret.json \<googleusername>@\<instance-name>:\<~/file path>**. The first time you scp you'll be asked to create a passphrase. If you just press enter twice, it will not create one. If you do enter a passphrase, you'll need to enter it each time you scp. Skipping the passphrase can be very helpful if you try to scp again months from now and can't remember your passphrase. If you run into any errors connecting to the instance, you may need to specify the project and zone (remember it also needs to be running)! For more guidance, I recommend checking out the [GCP documentation][scplink].
    2. Once your creds are loaded, you can authenticate your app. This is a one time authentication. Your browser may try to warn you that the application is unsafe. You can hit advanced and proceed anyhow. To set up authentication, you can either just try running your script (and making sure you set your [authorization file location][authlink] appropriately) or running python from the command line in the location where you moved your credentials and typing:
    {% highlight python %}
    import pygsheets
    gc = pygsheets.authorize() {% endhighlight %} You'll be directed to complete the authentication flow by copying a url into browser. Follow the ensuing instructions and paste the key into the command line and you should be all set! You can see how my code uses Google Sheets [here][mlbcodelink].

## Scheduling your instance
This is the part that allows you to start and stop your instance on a regular schedule. To set up the full workflow, you'll need to create each of the following

* [Pub/Sub topic][pubsublink] - A message that will carry the notification to kick off an event.
* [Cloud Function][cloudfunctionlink] - A function to actually perform an event.
* [Cloud Schedule Task][cloudschedulerlink] - A scheduled command to kick off the workflow.

### Setting up the Pub/Sub topic
To start, navigate to [Pub/Sub][pubsublink] and click on "Create Topic". You'll want to give it an easy name to track, such as "start-instance".

### Setting up the Cloud Function
Next, hop on over to your [cloud functions][cloudfunctionlink] and click "Create Function", then follow the steps below

1. Give your function a name, probably something like "startInstance".
2. Pick your region (again, probably want to keep it in the same region).
3. Select Pub/Sub as your Trigger. This is what will kick off your function. The Pub/Sub topic is really just delivering a message to your function to let it know it needs to start. In this case, it also delivers the zone and instance to start.  
4. Choose the "start instance" Pub/Sub in the drop-down. You can choose whether to "retry on failure". Depending on the frequency of your task and structure you may or may not need to retry. I do not for mine.
5. Hit "Next" and arrive at a code editor.
6. In the "Entry Point" input field, enter the name of the function (e.g., startInstance).
7. **In the index.js editor**, erase the existing code in the editor and enter the code below. Be sure to replace your function name where it says "exports.**<enter function name e.g., startInstance>**" on lines 33 and 77. This code can also be found on google's [tutorial repo][schedulergithublink], however I made a few small changes in lines 38-39, 82-83, and 120-122 . The script provided by Google calls for a label to be passed in the schedule task. I don't label my Google Cloud resources, so I removed the label component from the search. **The version below can be pasted into the index.js editor for both the start and stop function, just remember to change the stop function name**. To be clear, you do not need the start and stop code to be in the respective start and stop functions, but for convenience you can find all the code below.

{% highlight javascript linenos %}
// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START functions_start_instance_pubsub]
// [START functions_stop_instance_pubsub]
const Compute = require('@google-cloud/compute');
const compute = new Compute();
// [END functions_stop_instance_pubsub]

/**
 * Starts Compute Engine instances.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  zone - the GCP zone the instances are located in.
 *  label - the label of instances to start.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating
 *  completion.
 */
exports.<enter start function name> = async (event, context, callback) => {
  try {
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    //const options = {filter: `labels.${payload.label}`};
    const [vms] = await compute.getVMs();
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .start();

          // Operation pending
          return operation.promise();
        }
      })
    );

    // Operation complete. Instance successfully started.
    const message = `Successfully started instance(s)`;
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
// [END functions_start_instance_pubsub]
// [START functions_stop_instance_pubsub]

/**
 * Stops Compute Engine instances.
 *
 * Expects a PubSub message with JSON-formatted event data containing the
 * following attributes:
 *  zone - the GCP zone the instances are located in.
 *  label - the label of instances to stop.
 *
 * @param {!object} event Cloud Function PubSub message event.
 * @param {!object} callback Cloud Function PubSub callback indicating completion.
 */
exports.<enter stop function name> = async (event, context, callback) => {
  try {
    const payload = _validatePayload(
      JSON.parse(Buffer.from(event.data, 'base64').toString())
    );
    //const options = {filter: `labels.${payload.label}`};
    const [vms] = await compute.getVMs();
    await Promise.all(
      vms.map(async (instance) => {
        if (payload.zone === instance.zone.id) {
          const [operation] = await compute
            .zone(payload.zone)
            .vm(instance.name)
            .stop();

          // Operation pending
          return operation.promise();
        } else {
          return Promise.resolve();
        }
      })
    );

    // Operation complete. Instance successfully stopped.
    const message = `Successfully stopped instance(s)`;
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
// [START functions_start_instance_pubsub]

/**
 * Validates that a request payload contains the expected fields.
 *
 * @param {!object} payload the request payload to validate.
 * @return {!object} the payload object.
 */
const _validatePayload = (payload) => {
  if (!payload.zone) {
    throw new Error(`Attribute 'zone' missing from payload`);
  } //else if (!payload.label) {
    //throw new Error(`Attribute 'label' missing from payload`);
  //}
  return payload;
};
// [END functions_start_instance_pubsub]
// [END functions_stop_instance_pubsub]
{% endhighlight %}
* **In the package.json editor**, erase the existing code in the editor and enter the following
{% highlight JSON %}
{
  "name": "cloud-functions-schedule-instance",
  "version": "0.1.0",
  "private": true,
  "license": "Apache-2.0",
  "author": "Google Inc.",
  "repository": {
    "type": "git",
    "url": "https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "scripts": {
    "test": "mocha test/\*.test.js --timeout=20000"
  },
  "devDependencies": {
    "mocha": "^8.0.0",
    "proxyquire": "^2.0.0",
    "sinon": "^9.0.0"
  },
  "dependencies": {
    "@google-cloud/compute": "^2.0.0"
  }
}
{% endhighlight %}

* Click Deploy and your function should be set up! Note, in the step below, we'll pass the zone and instance name from the scheduler, which will be delivered via Pub/Sub to the function so it knows what to start!

### Setting up your Cloud Schedule Task
Finally, go to the [Cloud Scheduler][cloudschedulerlink], hit "Create", then follow the steps below
1. Select a region for your job (probably the same as your instance).
2. On the next page, give your job a name and description. I use "start-instance" for the one that starts it and "stop-instance" for the one that stops it!
3. Specify the schedule. The caption below offers more information, but you'll need to use the unix-cron format to schedule. The nice thing about cron scheduling is that its flexible enough to schedule for every 5 minutes or the third day of every month at midnight. For more info, check out this [help page][cronlink].
4. Select your timezone. Be careful when doing so. Later on we'll discuss setting cron jobs in your instance. These default to UTC, so if you decide not to change your cron timezone, you'll want to make sure the schedules are aligned. **I personally like using UTC for both as it is not affected by daylight savings.**
5. Select your target as Pub/Sub.
6. Enter your topic name - it should be the name you used in the Pub/Sub step above.
7. In the payload section, you'll tell your task what zone and instance to start. Paste in and edit the code below
{% highlight JSON %} {"zone":"<zone>","instance":"<instance-name>"} {% endhighlight %}

### Setting up the stop instance workflow
The workflow above is great for starting your instance, but the whole point of this process is to start, then stop the instance. To set up the stopping workflow, follow the same steps, just change the names to stop and double check that you fill in the stop function name in the cloud function script. Remember to set the time intervals between starting and stopping appropriately so you stop the script after it's been started (and vice versa).

## Scheduling your python script
Once you've set up your instance to start and stop, you'll want to set up your script to run via crontab in the instance. This process is fortunately much more straightforward. Start up your instance and ssh in. Once in your instance, type **crontab -e**. You'll be asked to choose your editor, (I prefer nano) then you'll be taken to the crontab file. To read more about this file, checkout [crontab.guru][crontabguru]. There you can also find a helpful [editor][crontabcalc] for testing crontab timing.

Once in your crontab file, you can schedule your script. **Again, be mindful of timing and time zones!** The goal is to schedule your crontab to run while your instance is running. Your crontab will be running on UTC by default. You'll therefore want to take into account the appropriate UTC time to align with your instance's start/stop time. Once you find the right time, enter a command similar to the one below to schedule your script:
{% highlight shell %} 0 10 * * * python3 /home/<google username>/projections_code/update_batting_avg-gcp.py {% endhighlight %}
If you have multiple python installations (e.g., python 2.7, anaconda, etc.) you will need to specify exactly which python executable to use. Similarly, you will likely want to adjust your path based on where your file is located.

Lastly, I recommend testing your scheduler and cron times to make sure they're in alignment. I tested mine by setting the timelines to run a few minutes later, then adjusting the actual scripts once I knew it worked. While it was a good amount of work up front, it's certainly saved me some time since and makes for a fun Tableau dashboard. I hope you found this guide informative - please feel free to reach out through the [contact form][contactlink] with feedback!


[initiallink]: http://www.irarickman.com/blog/Auto-Refreshing-Tableau-Public/
[mlbtableaulink]: https://public.tableau.com/profile/ira.rickman#!/vizhome/MLBBattingAverageProjectionTool
[mlbcodelink]:https://github.com/irickman/projections_code/blob/master/update_batting_avg-gcp.py
[gcpsetuplink]: https://cloud.google.com/compute/docs/quickstart-linux
[freetierlink]: https://cloud.google.com/free/docs/gcp-free-tier#top_of_page
[projectpagelink]:https://console.cloud.google.com/projectselector2
[movinglink]:https://cloud.google.com/compute/docs/instances/moving-instance-across-zones
[gcloudlink]: https://cloud.google.com/sdk/docs/downloads-interactive
[gcpinstancelink]:https://cloud.google.com/compute/docs/instances/connecting-to-instance#gcloud
[gsheetsapilink]:https://erikrood.com/Posts/py_gsheets.html
[scplink]:https://cloud.google.com/sdk/gcloud/reference/compute/scp
[authlink]:https://pygsheets.readthedocs.io/en/stable/authorization.html
[cloudschedulerlink]:https://console.cloud.google.com/cloudscheduler
[cronlink]:https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules?&_ga=2.6352244.-757052567.1596254043#defining_the_job_schedule
[pubsublink]:https://console.cloud.google.com/cloudpubsub/
[cloudfunctionlink]:https://console.cloud.google.com/functions/
[schedulergithublink]:https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/functions/scheduleinstance
[crontabguru]:https://crontab.guru/crontab.5.html
[crontabcalc]:https://crontab.guru/
[contactlink]:http://www.irarickman.com/contact/
