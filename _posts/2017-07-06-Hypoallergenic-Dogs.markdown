---
layout: post
title: "Choosing a Hypoallergenic Dog"
category : viz
tagline: "Supporting tagline"
tags : [viz, dogs, allergies]
date : 2017-07-06
---

<p class="intro"><span class="dropcap">T</span>oday is the 6 month anniversary of my parents getting a new dog named Brody. He's an adorable miniature pinscher and by all means, a great dog, but there's one big problem. I'm highly allergic to dogs and Brody is not hypoallergenic.</p>

Although my parents already have one hypoallergenic dog, they didn't realize Brody wasn't hypoallergenic until after he'd captured my brother and sister's hearts. Thus, to assist in their future searches, should they decide to get a third dog, and to help others like myself, I've put together a visualization of hypoallergenic dogs.

<iframe
  style="border: 0px;"
  src="https://public.tableau.com/views/HypoallergenicDogs/HypoallergenicDogs?:embed=y&:showVizHome=no"
  scrolling="no"
  width="1000px"
  height="1000px">
</iframe>

### My Approach

At the outset I wanted to create a tool to help prospective owners choose the right dog, based on their allergy tolerance. From experience I knew that certain dogs caused more allergic reactions than others, however [research][studylink] indicated otherwise. I quickly pivoted to a slightly simpler version to help dog lovers choose among "hypoallergenic" dogs.

As a non-dog owner, I tried to consider the factors people care about when choosing a dog. I figured some of the key factors might include:

* Cost
* Size
* Intelligence
* Grooming
* Lifespan
* Cuteness

As luck would have it, I was able to find much of this data compiled by [Knowledge is Beautiful][bestinshow], sourced from the American Kennel Club (as much as I wanted to use this [definitive ranking][puppers] on dog cuteness, popularity seemed an appropriate stand-in). I downloaded the data and loaded it into Python for some basic data cleansing. I was left with key characteristics for 186 breeds.

Next, I did some research on hypoallergenic dogs, so I could merge them with my existing data. I found a pretty comprehensive list at [dogbreedslist.info][hypos] and created a very basic webscraper using BeautifulSoup to gather the list in Python. Then I cleaned the list in Python and merged it with my dog characteristic data, to create a set of 23 dogs (with complete data) to visualize in Tableau. After an enjoyable afternoon spent googling pictures of dogs and formatting my Tableau visualization, I was left with the visualization above.

### Next Steps

While I hoped to include more dogs, with more characteristics and more analysis, I decided that an important first step in blogging, is just getting started. It's not yet perfect, but I hope to continue adding to this post in the future, incorporating additional breeds and eventually trying to model allergy inducement in dogs (despite what research suggests, I think otherwise). Thanks for reading, if nothing else, I hope you enjoy the pictures of dogs!


[studylink]: https://well.blogs.nytimes.com/2011/07/11/the-myth-of-the-allergy-free-dog/
[puppers]: https://www.buzzfeed.com/kaelintully/sorry-guys-this-was-really-hard?utm_term=.ksD6orzqq#.bhMJ1K4ee
[bestinshow]: https://docs.google.com/spreadsheets/d/1l_HfF5EaN-QgnLc2UYdCc7L2CVrk0p3VdGB1godOyhk/edit#gid=20
[hypos]: http://www.dogbreedslist.info/hypoallergenic-dog-breeds/list_14_1.html#.WV6xOBMrLq0
