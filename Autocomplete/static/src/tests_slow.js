function assertEqual(test, expected, actual) {
  if (expected !== actual) {
    console.log(`FAILED: ${test} - Expected ${expected}, but got ${actual}`);
  } else {
    console.log(`PASSED: ${test}`);
  }
}

function assertShallowArr(test, expected, actual) {
  if (expected.length !== actual.length) {
    console.log(`FAILED: ${test} - Expected ${expected}, but got ${actual}`);
    return;
  }
  for (let i = 0; i < expected.length; ++i) {
    if (expected[i] !== actual[i]) {
      console.log(`FAILED: ${test} - Expected ${expected}, but got ${actual}`);
      return;
    }
  }
  console.log(`PASSED: ${test}`);
}

var testDict = [
  "a",
  "aardvark",
  "abaci",
  "aback",
  "censoriously",
  "censoriousness",
  "censorship",
  "censurable",
  "censure",
  "hegira",
  "heifer",
  "height",
  "marshy",
  "marsupial",
]

var wordHash = buildWordSet(testDict);

console.log(assertEqual("wordHash has correct entries ('a')",
  4, wordHash['a'].length));

console.log(assertEqual("wordHash has correct entries ('c')",
  5, wordHash['c'].length));

console.log(assertEqual("wordHash has correct entries ('h')",
  3, wordHash['h'].length));

console.log(assertEqual("wordHash has correct entries ('m')",
  2, wordHash['m'].length));

console.log(assertEqual("search ab returns two entries",
  2, searchString("ab", wordHash).length));

console.log(assertShallowArr("search ab returns exact match",
  ["abaci", "aback"], searchString("ab", wordHash, 5)));

console.log("::Time Test - Start::");

let wordSet = buildWordSet(dictionary);
let t0 = performance.now();
for (let i = 0; i < 10000; ++i) {
  searchString("accu", wordSet, 100);
}
let t1 = performance.now();
console.log("::Time Test - Complete::")
console.log("::Total Time - " + (t1-t0) + "::");
