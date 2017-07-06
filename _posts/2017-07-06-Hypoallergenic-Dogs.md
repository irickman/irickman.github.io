---
layout: post
category : viz
tagline: "Supporting tagline"
tags : viz
---


Today is the 6 month anniversary of my parents getting a new dog named
Brody. He's an adorable miniature pinscher and by all means, a great dog, but
there's one big problem. I'm highly allergic to dogs and Brody is not
hypoallergenic.

Although my parents already have one hypoallergenic dog, they didn't realize
Brody wasn't hypoallergenic until after he'd captured my brother and sister's
hearts. Thus, to assist in their future searches, should they decide to get a
third dog, and to help others like myself, I've put together a visualization of
hypoallergenic dogs.

At the outset I wanted to create a tool to compare the key pieces of information
needed when buying a dog, so prospective buyers could compare among only
hypoallergenic ones. My first step was to research allergies to dogs, to see if
there's any variability in the degree of allergy inducement. After some
googling and reading (specifically this STUDY), it became clear that there's
no discernible pattern among allergies to dogs. Apparently, allergies to dogs
are the result of their hair, skin, saliva, and really just everything. Once I
nixed that idea, I found a list of dogs that are considered hypoallergenic here.

I created a webscraper using BeautifulSoup to gather the list. Then I cleaned
the list in python and started gathering data on the dogs themselves.
Fortunately, Knowledge is Beautiful compiled this data set containing
Best in Show data on 186 dog breeds. I downloaded it and loaded it into python.
Next I merged the datasets together I unfortunately had to
drop a few breeds, but was left with a complete data set combining
