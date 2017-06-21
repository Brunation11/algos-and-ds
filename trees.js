////////////////////
// TREES
////////////////////

/*
Have parent child relationships;
At every level, a node that has children is a tree itself;
Nodes that have no children are leaves;

INTERFACE:
- Constructor:
  - storage
  - root
- Methods:
  - insert: inserts a new key in the tree
  - search(key): searches for key in the tree; returns true if it exists; returns false if it doesn't
  - min/max: returns min or max key/value pair in the tree
  - remove(key: removes the key from the tree
*/

/*
TREES

Abstract data type

General Tree:
A tree has a root node.
The root node has 0 or more children.
Each child node has 0 or more children.
(each node in the tree can be seen as a subtree)

Constraints:
A child has only one parent and the root node has no parent.
Note: A tree is a special type of graph. A tree is a graph without cycles.
*/

/*
*** Operations:

tree.addChild(value)
=> child node (new tree)
add child to tree/subtree and return child node (which should be a tree instance)

tree.contains(value)
=> true/false
Return true if value is in tree, false if not

tree.traverseDepthFirst(callback)
=> undefined
Invoke the callback for every node in a depth-first order

tree.traverseBreadthFirst(callback)
=> undefined
Invoke the callback for every node in a breadth-first order

*** Additional Exercises:
Given treeA and treeB, check if treeB is a subtree of treeA (meaning that there exists a node n in treeA such that the subtree of n is identical to treeB).

Given a dictionary, create a prefix tree (commonly known as a trie)
https://en.wikipedia.org/wiki/Trie

*/

// N-ary Tree (any number of children)
function Tree (value) {
  this.value = value;
  this.children = [];
}

// Adds child to tree or subtree bound to 'this' keyword
Tree.prototype.addChild = function(value) {
  var child = new Tree(value);
  this.children.push(child);
  return child;
};
// Time complexity: O(1)


Tree.prototype.contains = function(value) {
  if (this.value === value) return true;
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(value)) return true;
  }
  return false;
};
// Time complexity:O(n)


Tree.prototype.traverseDepthFirst = function(fn) {
  // implement me...
};
// Time complexity:


Tree.prototype.traverseBreadthFirst = function(fn) {
  // implement me...
};
// Time complexity:

////////////////////
// LINKED LISTS
////////////////////

/*
A linked list is a tree structure with only one child per node.
Each node in the list contains:
- Stored data ---> a node value
- Stored reference ---> a 'link' to the next item in the list

INTERFACE:
- Constructor:
  - storage
  - head
- Methods:
  - add to tail(val): adds node to tail
  - remove(node): removes node from list & returns it
*/


/*
PSEUDOCODE A LINKED LIST

Node Constructor
  this.value
  this.next

List Constructor function, takes value
  new Node()
  set this.head, node
  set this.tail, node

  Add to tail (value)
    Create node from value
    Set tail's next to node
    Update the LL tail to new node

  Remove node (node)
    Set parent to head
    While parent's next is not null or node
      Parent is parent.next
    When found, set parent.next to child/node's next
*/

/*
LINKED LIST

Comprised of nodes that represent a sequence.
Each node is composed of data and a reference/link to the next node.
*/

// Define a constructor for a node that takes in a value
function Node (value) {
  // Initiate a node by setting next to null by default;
  this.next = null;
  // Initiate a node by setting value to its value by default;
  this.value = value;
}

// Define a constructor for a linked list that takes in a value for the head
function LinkedList (headValue) {
  // Before initiating a linked list ensure that a value has been passed in for the head node
  if (headValue === undefined) console.log('Must provide value for first node');
  // Initiate a linked list by setting a property head to a new node with the head value
  this.head = new Node(headValue);
  // Initiate a linked list by setting a property tail to the property head
  this.tail = this.head;
}

// *** Operations:

// myList.forEach(callbackFn)
// invoke callback function with the value of each node

// Add a new prototype method to the linked list;
// This method takes a function as it's argument;
LinkedList.prototype.forEach = function(callBack) {
  // We need a starting point, so we set the variable node to the only reference we have, this.head.
  var node = this.head;
  // This function is meant to apply the callback to all nodes in the list;
  // By setting the condition for this loop to node, we're checking that every time the node variable is updated, it has a reference to a subsiquent node
  while (node) {
    // For every instance of the while loop, use the callback function, passing in the current nodes value as the argument
    callBack(node.value);
    // Reasign node to the current nodes next property;
    // This will take us to the next node in the list;
    node = node.next;
  }
}

// myList.print()
// => string with all values in list (ex: '0, 1, 2, 3')

// Add a new prototype method to the linked list;
LinkedList.prototype.print = function() {
  // Set a variable equal to a string to store values;
  var values = '';
  // Use our for each function and pass it in a callback;
  this.forEach(function(node) {
    // For each node concat its value to the values string;
    values += (node.value + ', ');
  });
  // Return the values string;
  return values;
}

// myList.insertAfter(refNode, value)
// => new node
// insert new node associated with value passed in after refNode

// Add a new prototype method to the linked list that takes a reference node and a new value as it's arguments;
LinkedList.prototype.insertAfter = function (refNode, value) {
  // Create a new node passing in the value;
  newNode = new Node(value);
  // Assign the new nodes next property to the refNodes old next property
  newNode.next = refNode.next;
  // Reassign the refNodes next property to the new node;
  refNode.next = newNode;
  // If the refNode was the current tail, reasign tail;
  if (this.tail === refNode) this.tail = newNode;
}

// myList.removeAfter(refNode)
// => removed node
// remove node after the refNode

// Add a new prototype method to the linked list that takes a reference node as it's argument;
LinkedList.prototype.removeAfter = function (refNode) {
  if (this.tail === refNode.next) this.tail = refNode;
  if (refNode.next && refNode.next.next) refNode.next = refNode.next.next;
}

// myList.insertHead(value)
// => new head
// insert new head node at the beginning of the list with the value passed in

// Add a new prototype method to the linked list that takes a value as it's argument;
LinkedList.prototype.insertHead = function (value) {
  var oldHead = this.head;
  this.head = new Node(value);
  this.head.next = oldHead.next;
}

// myList.removeHead()
// => removed head node
// remove the head node of the linked list

// Add a new prototype method to the linked list;
LinkedList.prototype.removeHead = function () {
  this.head = this.head.next;
}

// myList.findNode(value)
// => first node that has a value matching what was passed in

// Add a new prototype method to the linked list that takes a value as it's argument;
LinkedList.prototype.findNode = function (value) {
  if (this.head.value === value) return this.head;
  if (this.tail.value === value) return this.tail;

  var node = this.head;

  while (node) {
    if (node.value === value) return node;
    node = node.next;
  }
}

////////////////////
// BINARY SEARCH TREE
////////////////////

/*
BINARY SEARCH TREES

Abstract data type
A binary search tree is a tree with the additional constraints:
- each node has only two child nodes (node.left and node.right)
- all the values in the left subtree of a node are less than or equal to the value of the node
- all the values in the right subtree of a node are greater than the value of the node

*/

/*
Pseudocoding Binary Search Trees

Constructor
  value
  left
  right

Methods
  insert(value)
    goal: find proper place
      - if value < current
        - if (left) go left
        - else insert
      - if value > current
        - if (right) go right
        - else insert
/*
*** Operations:

bsTree.insert(value)
=> bsTree (return for chaining purposes)
Insert value into correct position within tree

bsTree.contains(value)
=> true/false
Return true if value is in tree, false if not

bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.isValid()
=> returns true if BST is a valid BST otherwise returns false. This method is useful for checking your other methods.

bsTree.removeNode(value)
=> node
Remove node from tree.

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/

function BinarySearchTree (value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function(value) {
  var tree = new BinarySearchTree(value);
  if (value <= this.value) {
    this.left ? this.left.insert(value) : this.left = tree;
  } else {
    this.right ? this.right.insert(value) : this.right = tree;
  }
  return this;
};
// Time complexity: O(log(n))

BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) return true;
  if (value < this.value && !!this.left) {
    return this.left.contains(value);
  }
  if (value > this.value && !!this.right) {
    return this.right.contains(value);
  }
  return false;
};
// Time complexity: O(log(n))

BinarySearchTree.prototype.deleteMin = function(parent) {
  if (!this.right && !this.left) { // If no right and left values then node is leaf
    if (parent) { // if a parent has been passed, signals recursive call
      parent.left = null; // the element being set to null here is the assumed max after recursive traversal left
    } else { // if no parent, no left, and no right, must be root and therefor min
      this.value = null; // instead of deleting tree all together just set val to null so tree can be reused
    }
  } else if (!this.left && this.right) { // if not this.left then this is most likely min, but it has a right child
    if (parent) { // if a parent has been passed, signals recursive call
      parent.left = this.right; // in which case move child branch up to parent
    } else { // if no parent, no left, and a right, we're replacing the root  node
      this.value = this.right.value; // reassign root node properties
      this.right = this.right.right // reassign root node properties
    }
  }
  if (this.left) this.left.deleteMin(this); // recursively traverse left node until expected min is located
  return this; // return this to allow for method chaining
}

BinarySearchTree.prototype.deleteMax = function(parent) {
  if (!this.right && !this.left) { // If no right and left values then node is leaf
    if (parent) { // if a parent has been passed, signals recursive call
      parent.right = null; // the element being set to null here is the assumed max after recursive traversal right
    } else { // if no parent, no left, and no right, must be root and therefor max
      this.value = null; // instead of deleting tree all together just set val to null so tree can be reused
    }
  } else if (!this.right && this.left) { // if not this.right then this is most likely max, but it has a left child
    if (parent) { // if a parent has been passed, signals recursive call
      parent.right = this.left; // in which case move child branch up to parent
    } else { // if no parent, no right, and a left, we're replacing the root node
      this.value = this.left.value; // reassign root node properties
      this.left = this.left.left; // reassign root node properties
    }
  }
  if (this.right) this.right.deleteMax(this); // recursively traverse right node until expected max is located
  return this; // return this to allow for method chaining
}

BinarySearchTree.prototype.deleteNode = function(value) {
  if (found) {
    // figure out how many children
    var childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
    // special case: the value is at the root
    if (current === this._root) {
      switch(childCount) {
        // other cases removed to save space

        // two children
        case 2:
          var replacement = this._root.left;
          // find the right-most leaf node to be the new root
          while (replacement.right !== null) {
            var replacementParent = replacement;
            replacement = replacementParent.right;
          }
          // if it's not the first node on the left
          if (replacementParent !== null) {
            // remove the new node from it's previous position
            replacementParent.right = replacement.left;
            // give the new root all of the old root's children
            replacement.right = this._root.right;
            replacement.left = this._root.left;
          } else {
            // just assign the children
            replacement.right = this._root.right;
          }
          // officially assign new root
          this._root = replacement;
      }
    }
  }
}

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) {
  if (this.left) this.left.traverseDepthFirst_inOrder(fn);
  fn(this);
  if (this.right) this.right.traverseDepthFirst_inOrder(fn);
};
// Time complexity: O(n)

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  fn(this);
  if (this.left) this.left.traverseDepthFirst_preOrder(fn);
  if (this.right) this.right.traverseDepthFirst_preOrder(fn);
};
// Time complexity: O(n)

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function(fn) {
  if (this.left) this.left.traverseDepthFirst_postOrder(fn);
  if (this.right) this.right.traverseDepthFirst_postOrder(fn);
  fn(this);
};
// Time complexity: O(n)


BinarySearchTree.prototype.checkIfFull = function() {
  // implement me...
};
// Time complexity:

BinarySearchTree.prototype.checkIfBalanced = function() {
  // implement me...
};
// Time complexity:


var bsTree = new BinarySearchTree(10);
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14);

                            //10
              
                    //                \\
            
              //5                           //15
          
          //      \\                    //        \\
      
      //3            //8            //14             //20
                   
                   //   \\                        //
                 
                 //7     //9                  //17

var result_traverseDepthFirst_inOrder = [];
bsTree.traverseDepthFirst_inOrder(function(node) {
  result_traverseDepthFirst_inOrder.push(node.value);
});
console.log(result_traverseDepthFirst_inOrder, 'should be [3,5,7,8,9,10,14,15,17,20]');

var result_traverseDepthFirst_preOrder = [];
bsTree.traverseDepthFirst_preOrder(function(node) {
  result_traverseDepthFirst_preOrder.push(node.value);
});
console.log(result_traverseDepthFirst_preOrder, 'should be [10,5,3,8,7,9,15,14,20,17]');

var result_traverseDepthFirst_postOrder = [];
bsTree.traverseDepthFirst_postOrder(function(node) {
  result_traverseDepthFirst_postOrder.push(node.value);
});
console.log(result_traverseDepthFirst_postOrder, 'should be [3,7,9,8,5,14,17,20,15,10]');

// 

////////////////////
// EXPLORING BINARY SEARCH TREES
////////////////////

/*
in-order:
  - Traversed from smallest value to largest
  - Operates on the child before moving back up to parent
pre-order:
  - Operate on self before moving down to left child, then down to right child
post-order:
  - Operates on left beofre moving over to right then back up to self


How do we explore the following data structures?
  - Linked List: traversed using a while loop to check the next property of a node is another node
  - Array: traversed using for... loop
  - Object: traversed using for...in... loop
  - Stack/Queue: not meant to be traversed
*/

/*
Pseudocoding In-Order Traversal

-Pattern: left recursively, self, right
-If left, recurse call on left
-Repeat
-Opperate on self
-If right, recurse call on right
-Repeat
==============================================================
base case: traverse when you are leaf?

{
  if (!!this.left) {
    traverse(this.left);

  fn(this.val);

  if (!!this.right) {
    traverse(this.right);

  //implicit: 
    - return undefined
    - current implementation side effects only
}

*/



/*
Pseudocoding Pre-Order Traversal

-Pattern self, left, right
-Opperate on self
-If left, recurse call on left
-Repeat
-If right, recurse call on right
-Repeat
==============================================================
base case: traverse when you are leaf?

{
  fn(this.val);

  if (!!this.left) {
    traverse(this.left);

  if (!!this.right) {
    traverse(this.right);

  //implicit: 
    - return undefined
    - current implementation side effects only
}
*/



/*
Pseudocoding Post-Order Traversal

-Pattern left, right, self
-If left, recurse call on left
-Repeat
-If right, recurse call on right
-Repeat
-Opperate on self
==============================================================
base case: traverse when you are leaf?

{
  if (!!this.left) {
    traverse(this.left);
  
  if (!!this.right) {
    traverse(this.right);
  
  fn(this.val);

  //implicit: 
    - return undefined
    - current implementation side effects only
}
*/

/*
Pseudocoding Delete Node

deleteNode(val)
{
  - search for node/val
    - check if current val equals val
      - if so, delete(val, current)
      - else search(val)
}

==============================================================

delete(val, parent)
{
  - if it's the root
  - else 
    - set relationship for parent (L, R)
    - if its a leaf
      - delete it (which pointer do we make null?)
    - else if it has 1 node (left or right)
      - check if current node L or R
        - if it has a left, then set the left to the parent's relationship for the to-be-deleted node
}

*/


function deleteNode (val) {
  if (this.val === val) {
    delete(val, this);
  } else {
    this.left.deleteNode(val);
    this.right.deleteNode(val);
  }
}

function deleteNode (val, parent) {
  if (!this.left && !this.right) {
    if (parent.left && parent.left.val === val) {
      parent.left = null;
    } else if (parent.right && parent.right.val === val) {
      parent.right = null;
    }
  }
}
