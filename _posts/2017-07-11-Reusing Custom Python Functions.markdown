---
layout: post
title: "Reusing Custom Python Functions"
category : python
tagline: "Supporting tagline"
tags : [python, functions]
date : 2017-07-11
---

<p class="intro"><span class="dropcap">S</span>imilar to many new Python coders, I've found myself repeating many of the same functions and operations. Since I'm not too keen on constantly copying and pasting the same code, I decided to try to streamline the process. </p>

To make my life easier (so I don't have to remember as much code), I set out to store my custom functions in one central location, making them easily available to use. Given that exploratory data analysis or EDA (figuring out what your data looks like) is the first thing a data scientist does with a new data set, I made performing EDA my first reusable custom function.

<figure>
  {% highlight python %}
  def EDA(data):
      """This function performs EDA on an Pandas dataframe"""
      print 'The shape of the data is: ' + str(data.shape) + "\n"
      print 'The data types are listed below: \n' + str(data.dtypes) + "\n"
      print 'Here are any missing values: \n' + str(data.isnull().sum())
      print 'There are: ' + str(data.duplicated().sum()) + ' duplicated rows'
      print 'Here are the first 5 lines: \n' + str(data.head()) + '\n'
      print 'The description of the data is listed here: \n' + str(data.describe(include='all')) + "\n"
  {% endhighlight %}
  <figcaption> Here's a snippet of my EDA function </figcaption>
</figure>

### Writing My EDA Function

First, I wrote my code, as shown above, in my text editor. The function takes in a Pandas data frame, then gives me the:

* Number of rows and columns
* Types of data in each column
* Number of missing values
* Number of duplicated rows
* Print out of the first five rows
* Summary Statistics on each column (count, mean, median, minimum, maximum and percentiles)

### Storing My EDA Function

Next, I searched through my directory to find the location of my Python packages. After a bit of digging, I found a folder with the path **Users>myusername>Anaconda2>lib>Python 2.7>site-packages**. In the site-packages folder, I found some of the packages I frequently use, so I knew I was in the right place. Once I found the right folder, I named my text file as "myfunctions.py" and saved it to **Users>myusername>Anaconda2>lib>Python 2.7>site-packages**.

<figure>
	<img src="{{ '/assets/img/Aaron Judge.png' | prepend: site.baseurl }}" alt="">
	<figcaption>Peforming EDA on Aaron Judge's 2017 Home Runs</figcaption>
</figure>

### Using My EDA Function

To use the file, I simply need to import "myfunctions" at the start of a script to access my EDA function. In the example above, I used the function to learn more about a data set containing all of Aaron Judge's home runs before the All-Star break in 2017. After running it, I can see that there are 30 rows, with data observed across 9 variables including data on the game, the situation, and the home run itself.

### Next Steps

It's nice to be able to quickly and repeatedly perform EDA, but there will certainly be more custom functions I want to write and reuse in the future. Fortunately, by storing my custom functions in a central location, I can just add new ones to the "myfunctions.py" file. Once I save the file, then import it, I'll have access to any new functions I store there, making it quick and easy to reuse custom functions of any type.
