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

var wordTries = buildWordSet(testDict);

var searchA = searchString("a", wordTries, 4);
var searchB = searchString("b", wordTries, 6);
var searchC = searchString("C", wordTries, 6);
var searchH = searchString("h", wordTries, 6);
var searchM = searchString("m", wordTries, 6);

console.log(assertEqual("search A correct length",
  4, searchA.length));

console.log(assertEqual("search B correct length",
  0, searchB.length));

console.log(assertEqual("search C correct length",
  5, searchC.length));

console.log(assertEqual("search H correct length",
  3, searchH.length));

console.log(assertEqual("search M correct length",
  2, searchM.length));

let wordSet = buildWordSet(dictionary);
let t0 = performance.now();
for (let i = 0; i < 10000; ++i) {
  searchString("accu", wordSet, 100)
}
let t1 = performance.now();
console.log("::Time Test - Complete::")
console.log("::Total Time - " + (t1-t0) + "::");
