#Overview
This little app demonstrates an auto-complete feature in a search bar. Currently it only pulls from a dictionary but could be extended to utilize a database with any type of data (saved search queries, etc).

Autocomplete is part of a larger project, called "Micro", containing a collection of small (micro) apps.

#Install
Simply clone the "Micro" respository folder using:
```
git clone git@github.com:BrianMHarris/micro.git
```
and navigate to the Autocomplete app.

#Usage
You can run the following files for different results:

* "index_slow.html" - 
* "index_fast.html" - 
* "index_tests_slow

Worst-case Scenario:
searchWords_slow is much much slower than searchWords_fast

I have found a few instances where searchWords_slow can be faster. When the search string is at or near the beginning of the list it doesn't have to iterate that much.

I believe average case, searchWords_fast is superior.

More testing!
