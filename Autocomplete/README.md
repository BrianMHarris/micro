#Overview
This little app demonstrates an auto-complete feature in a search bar. Currently it only pulls from a dictionary but could be extended to utilize a database with any type of data (saved search queries, etc).

There are two main algorithms used, separated into two files. "Slow" separates the dictionary, alphabetically, and stores it in a hash table of sorts. After hitting the first letter, it's a linear search through each word, matching the string typed. "Fast" also separates the dictionary alphabetically but stores the words in Tries. This allows for building words very quickly using a recursive tree traversal function.

A quick analysis showed that the "fast" method was several times quicker when matches for the input string were not found early in a letter's list of words. A lot faster. Maybe one day I will add the numbers. Lots of readme's to write!

Autocomplete is part of a larger project, called "Micro", containing a collection of small (micro) apps.

#Install
Simply clone the "Micro" respository folder using:
```
git clone git@github.com:BrianMHarris/micro.git
```
and navigate to the Autocomplete app.

#Usage
You can run the following files for different results:

* "index_slow.html" - This autocomplete utilizies my "first pass" attempt. Data is stored in a hash table -like structure.
* "index_fast.html" - Second pass on autocomplete feature. Data is stored in a Trie (n-nary tree) for faster lookups.
* "index_tests slow.html" - A test file that outputs _slow test results to console, including performance timing.
* "index_tests fast" A test file that outputs _fast test results to console, including performance timing.

#Technology
* [jQuery](https://jquery.com/)
* Aside from a little CSS and a bunch of JS, that's it.

