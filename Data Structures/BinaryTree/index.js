//module.exports

class TreeNode {
  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(value = null) {
    this.root = value? new TreeNode(value) : null;
    this.length = value? 1 : 0;
  }

  insert(value) {
    var nodeToInsert = new TreeNode(value);

    if (!this.root){
      this.root = nodeToInsert;
    } else {
      let queue = [this.root];
      let current;

      while (queue.length) {
        current = queue.shift();
        if (current.left === null) {
          current.left = nodeToInsert;
          ++this.length;
          return this;
        } else if (current.right === null) {
          current.right = nodeToInsert;
          ++this.length;
          return this;
        }
        // if we got here, there is both a left and right
        queue.push(current.left);
        queue.push(current.right);
      }
    }
    return this; // always return the BST for easy chaining
  }

  // a breadth-first-search for a specific value
  searchBFS(value) {

  }

  searchDFS(value) {

  }

  // Given a root node of a binary tree, count the number of leaves in the tree.
  // Time: O(N)
  // Space: O(N) - technically return has to reserve a variable for each call.
  countLeaves(node = this.root) {
    return node? (1 + this.countLeaves(node.left) + this.countLeaves(node.right)) : 0;
  }

  // Given a root node of a binary tree, where the values of nodes are integers,
  //  return the maximum value of a node.
  // Time: O(N)
  // Space: O(N)
  maxValue() {
    let maxValue = null;
    let queue = [this.root];
    let current;
    let index = 0;
    while (index < queue.length) {
      current = queue[index]; // never dequeue.
      if (!current) break;
      maxValue = Math.max(maxValue, current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      index++;
    }

    // undefined will tell us there is no value in the tree (preferred over null in this case)
    return maxValue !== null? maxValue : undefined;
  }

  // Given a root node of a binary tree, determine the maximum depth of the tree.
  // Time: O(N)
  // Space: O(1) - unless you count activation records
  maxDepth(node) {
    let maxDepth = 0;
    let currentDepth = 0;
    // let that = this;
    // allowing node to be passed into function rather than here because
    //  we may want the depth from a specific node
    function dive(inspect = node || this.root) {
      if (inspect){
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);

        if (inspect.left) dive(inspect.left);
        if (inspect.right) dive(inspect.right);
      }

      currentDepth--;
      return;
    }

    dive.call(this);
    return maxDepth;
  }

  // Given a root node of a binary tree,
  //  return an array of the values of all nodes at a target level.
  getLevel(n) {
    let levelCounts = {};
    let currentLevel = 0;

    function dive(node = this.root) {
      if (node) {
        currentLevel++;
        levelCounts[currentLevel] = (levelCounts[currentLevel] + 1) || 1;

        if (node.left) dive(node.left);
        if (node.right) dive(node.right);
      }

      currentLevel--;
      return;
    }

    dive.call(this);
    return levelCounts[n];
  }
}

function assertEqual(test, actual, expected) {
  if (actual !== expected) {
    console.log(`Error: ${test} - expected (${expected}) but got (${actual})`);
  } else {
    console.log(`Passed: ${test}`);
  }
}

function mainTest() {
  var bst = new BST(1);
  assertEqual("BST built correctly", bst.root.value, 1);

  // Let's build a tree!
  //        1
  //      /   \
  //     2     3
  //    / \   / \
  //   4   5 6   7
  bst.insert(2);
  bst.insert(3);
  bst.insert(4);
  bst.insert(5);
  bst.insert(6);
  bst.insert(7);
  assertEqual("BST::insert", bst.root.left.value, 2);
  assertEqual("BST::insert", bst.root.right.value, 3);
  assertEqual("BST::insert", bst.root.left.left.value, 4);
  assertEqual("BST::insert", bst.root.left.right.value, 5);
  assertEqual("BST::insert", bst.root.right.left.value, 6);
  assertEqual("BST::insert", bst.root.right.right.value, 7);

  // countLeaves()
  assertEqual("BST::countLeaves", bst.countLeaves(), 7);

  // maxValue()
  assertEqual("BST::maxValue", bst.maxValue(), 7);
  var emptyTree = new BST();
  assertEqual("BST::maxValue:empty", emptyTree.maxValue(), undefined);

  // maxDepth()
  assertEqual("BST:maxDepth", bst.maxDepth(), 3);

  // getLevel()
  assertEqual("BST:maxDepth", bst.getLevel(3), 4);
}
mainTest();
