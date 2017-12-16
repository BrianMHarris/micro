// searchWords_fast
// This file contains functions that provide a trie-based solution
//  to building and returning an array of words for autocomplete
// The data structure that is built is massive. This is meant to be on a
//  server that is constantly up, and can search much faster than using a hash.

class TrieNode {
  constructor(value) {
    this.value = value;
    this.endWord = null;
    this.children = {}; // object for fast lookup, can convert to keys if necessary
  }
}

class WordTrie extends TrieNode {
  constructor() {
    super(null);

    dictionary.forEach((el) => (this.addWord(el)));
  }

  buildTrie(dictionary) {
    if (!dictionary) return null;
    dictionary.forEach((el) => (this.addWord(el)));
  }

  addWord(str) {
    const addWordHelper = (node, idx) => {
      if (!node.children[str[idx]]) {
        node.children[str[idx]] = new TrieNode(str[idx]);

        if (idx === str.length - 1)
          node.children[str[idx]].endWord = true;
      }
      if (idx < str.length - 1) {
        addWordHelper(node.children[str[idx]], idx + 1);
      }
    }
    addWordHelper(this, 0);
  }

  // get all words that can complete the string, up to num words
  getWordList(str, num) {
    function getRemaining(str, node) {
      let current = node;
      let idx = 0;
      while (idx < str.length && current) {
        current = current.children[str[idx]];
        ++idx;
      }
      return current;
    };

    var stringStack = [];
    var wordList = [];

    function wordsHelper(node) {
      if (wordList.length >= num) return;

      stringStack.push(node.value);

      // traverse each child to dive in and build a new string
      for (var key in node.children) {
        if (wordList.length >= num) break;

        const child = node.children[key];
        if (child.endWord) {
          // finish the word and add it to the word list
          stringStack.push(child.value);
          // HACK: sliceing off the front of the string stack
          //  to avoid junkly logic to keep the first node off
          wordList.push(str + stringStack.slice(1).join(""));
          // remove teh final letter so we can move on or not.
          stringStack.pop();
        } else {
          wordsHelper(child);
        }
      }

      stringStack.pop();
    }

    let remaining = getRemaining(str, this);
    if (remaining) {
      wordsHelper(remaining);
    }

    return wordList;
  }
}

/* Original, dirtier code below */
/* I did something to make this extremely slow and decided to refactor */
/* with a little research */

/*
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
    if (results.length >= num || !node) return;

    if (index < lowerCase.length - 1) {
      strStack.push(node.value);
      if (node.children[lowerCase[index+1]])
        traverse(node.children[lowerCase[index+1]], index + 1);
    } else {
      if (node.value !== "null")
        strStack.push(node.value);

      let keys = Object.keys(node.children);
      // first check if there is a "null terminator" <null>
      //  so we know this is a whole word
      if (keys.includes("null")) {
        results.push(strStack.join(""));
      }

      // traverse each child, in alphabetical order
      let char;
      for (var i = 0; i < 26; ++i) {
        if (results.length >= num) break; // one last check, would hate to recurse this much
        char = String.fromCharCode(97 + i);
        if (keys.includes(char))
          traverse(node.children[char], index + 1);
      }

      // always remove this letter from the stack since
      //  we're done with its children
      if (node.value !== "null")
        strStack.pop();
    }
  }

  // refactor so it doesn't require a node here
  traverse(wordTries[lowerCase[0]], 0);

  return results;
}

*/
