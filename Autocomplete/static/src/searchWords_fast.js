// searchWords_fast
// This file contains functions that provide a trie-based solution
//  to building and returning an array of words for autocomplete
// The data structure that is built is massive. This is meant to be on a
//  server that is constantly up, and can search much faster than using a hash.

class TrieNode {
  constructor(value=value) {
    this.value = value;
    this.children = {}; // object for fast lookup, can convert to keys if necessary
  }
}

// generic name so I can cleverly have 2 files, same names.
function buildWordSet(dict) {
  var wordTries = {};

  // start out with an entry for each letter.
  wordTries["'"] = new TrieNode("'");
  for (var i = 0; i < 26; ++i) {
    let char = String.fromCharCode(97 + i);
    wordTries[char] = new TrieNode(char);
  }

  function traverse(node, string, index) {
    if (!node) {return};

    if (index >= string.length) {
      // don't need a trie node since there is nowhere to go
      node.children["null"] = true;
      return;
    }

    // check if there is already an entry, if not make one
    if (!node.children[string[index]])
      node.children[string[index]] = new TrieNode(string[index]);

    traverse(node.children[string[index]], string, index + 1);
  }

  for (var j = 0; j < dict.length; ++j) {

    traverse(wordTries[dict[j][0]], dict[j], 1);

  }

  return wordTries;
}

// find the first 'num' matches in wordTrie. Matches
//  are defined as having a matching string containing
//  the search string in the first portion of the word.
function searchString(str, wordTries, num) {
  if (!str) return undefined;
  if (!num) num = 6;
  var results = [];
  var lowerCase = str.toLowerCase();
  var strStack = []; // to be used as a string state

  function traverse(node, index) {
    if (!node) return; // just in case
    if (results.length >= num) return;

    if (index < lowerCase.length - 1) {
      strStack.push(node.value);
      traverse(node.children[lowerCase[index+1]], index + 1);
    } else {
      if (node.value !== "null")
        strStack.push(node.value);

      let keys = Object.keys(node.children);
      if (keys.length) {
        // first check if there is a "null terminator" <null>
        //  so we know this is a whole word
        if (keys.includes("null")) {
          results.push(strStack.join(""));
        }

        // traverse each child, in alphabetical order
        for (var i = 0; i < 26; ++i) {
          if (results.length >= num) break; // one last check, would hate to recurse this much
          let char = String.fromCharCode(97 + i);
          if (keys.includes(char))
            traverse(node.children[char], index + 1);
        }
      }
      // always remove this letter from the stack since
      //  we're done with its children
      strStack.pop();
    }
  }

  traverse(wordTries[lowerCase[0]], 0);

  return results;
}
