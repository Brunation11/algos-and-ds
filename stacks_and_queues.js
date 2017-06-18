////////////////////
// STACKS
////////////////////

/*
Elimentary data structure
Last item placed in stack, will be first item out of stack
Utilizes "push" & "pop" methods
*/

////////////////////
// Visualing stacks in the "wild"
////////////////////

// var callStack = []

// Consider some function
var makeEggs = function(style, n) { // callStack.push(makeEggs)
  var completedEggs;
  if (style !== "boiled") {
    var crackedEggs = crackEggs(n); // callStack.push(crackEggs)
    if(style !== "scrambled") {
      completedEggs = fryEgg(crackedEggs, style);
    } else {
      var preppedEggs = whipEggs(crackedEggs);
      completedEgg = fryEgg(preppedEggs)
    }
  }
  return completedEggs;
}

// var callStack = [makeEggs(), crackEggs(), ...]
// indexes =       [    0     ,     1      , ...]

/* 
As we work down the function calls are added to the stack.
As calls are executed they are removed from the stack.
NOTE: LAST IN FIRST OUT
NOTE: common errors "stack overflow" or "stack exceeded", caused by finite amount of memory being acceeded(all alotted slots in stack filled)
*/

////////////////////
// Creating a Stack Constructor
////////////////////

var Stack = function (capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._size = 0;
};

Stack.prototype.push = function (val) {
  // throw error if our stacks capacity has maxed out
  if(this._size > this._capacity) {
    throw new Error("Max capacity already reached, remove elements before adding new ones");
  }
  // set val in our storage,
  // think of how arrays work, arrays are just objects, whos keys are indexes
  // once a value is set we're incrementing the stack size
  this._storage[this._size++] = val;
};

Stack.prototype.pop = function () {
  // if our stack is empty, return out of the method
  if (this._size < 0) return;
  // since we'll be removing a value from our stack we'll store a reference to it here
  var value = this._storage[--this._size];
  // we'll use the delete function to remove a property from our storage object
  delete this._storage[this._size];
  // return the value we've deleted
  return value;
}

Stack.prototype.size = function () {
  // return our size property
  return this._size;
}

////////////////////
  // Our stack in action
  ////////////////////
// var myNumberStack = new Stack();

// myNumberStack.push("zero");
// myNumberStack.push("one");
// myNumberStack.push("two");
// myNumberStack.push("three");
// myNumberStack.push("four");
// myNumberStack.push("five");
// console.log(myNumberStack.size()); // expect 6
// console.log(myNumberStack.pop()); // expect "five"
// console.log(myNumberStack.pop()); // expect "four"
// console.log(myNumberStack.pop()); // expect "three"
// console.log(myNumberStack.size()); // expect 3




////////////////////
// QUEUES
////////////////////

/*
Elimentary data structure
First Item in queue is first item out of queue
When value added "enqueued"
When value removed "dequeued"
*/

////////////////////
// Creating a Queue Constructor
////////////////////

var Queue = function (capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._head = 0;
  this._tail = 0;
};

Queue.prototype.enqueue = function (val) {
  // throw error if our queues capacity has maxed out
  if(this._size > this._capacity) {
    throw new Error("Max capacity already reached, remove elements before adding new ones");
  }
  // set val in our storage,
  // think of how arrays work, arrays are just objects, whos keys are indexes
  // once a value is set we're incrementing the queue tail index
  this._storage[this._tail++] = val;
};

Queue.prototype.dequeue = function () {
  // we'll be modifying "this.storage so we'll store the value we intent to "dequeue" here for now
  var value = this._storage[this._head];
  // delete value at head
  delete this._storage[this._head];
  // check if head is less than tail, meaning we havent reached the last element
  if (this._head < this._tail) this._head++;
  // return the variable we set earlier for the originally intended return value
  return value
}

Queue.prototype.size = function () {
  // tail is storing the highest index, since our storage uses a 0 index we add 1 here for the real size
  return this._tail - this._head;
}

////////////////////
  // Our stack in action
  ////////////////////
var myNumberQueue = new Queue();

myNumberQueue.enqueue("zero");
myNumberQueue.enqueue("one");
myNumberQueue.enqueue("two");
myNumberQueue.enqueue("three");
myNumberQueue.enqueue("four");
myNumberQueue.enqueue("five");
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 6
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "zero"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 5
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "one"
console.log(myNumberQueue.dequeue()); // expect "two"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 3
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "three"
console.log(myNumberQueue.dequeue()); // expect "four"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 1
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "five"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 0
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "undefined"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 0
console.log("//////////////////////");
console.log(myNumberQueue.dequeue()); // expect "undefined"
console.log(JSON.stringify(myNumberQueue._storage, null, 4));
console.log(myNumberQueue.size()); // expect 0
