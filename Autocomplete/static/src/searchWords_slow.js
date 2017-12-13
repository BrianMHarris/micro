// searchWords_slow
// This file contains functions that provide a brute force solution
//  to building and returning an array of words for autocomplete
// The hash is barely a hash, here. This is for speed of development.

// generic name so I can cleverly have 2 files, same names.
function buildWordSet(dict) {
  var wordHash = {};

  wordHash["'"] = [];
  for (var i = 0; i < 26; ++i) {
    wordHash[String.fromCharCode(97 + i)] = [];
  }

  for (var j = 0; j < dict.length; ++j) {
    wordHash[dict[j][0].toLowerCase()].push(dict[j]);
  }

  return wordHash;
}

// find the first 'num' matches in wordHash. Matches
//  are defined as having a matching string starting with
//  the first character.
function searchString(str, wordHash, num) {
  if (!str) return undefined;
  if (!num) num = 6;
  var results = [];
  var resultCount = 0;
  var index = 0;
  var lowerCase = str.toLowerCase();
  var searchHash =  wordHash[str[0]];

  while(resultCount < num && index < searchHash.length) {
    if (lowerCase === searchHash[index].slice(0, str.length).toLowerCase()) {
      results.push(searchHash[index]);
      ++resultCount;
    }
    ++index;
  }
  return results;
}
