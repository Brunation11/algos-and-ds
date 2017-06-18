////////////////////
// RECURSION
////////////////////

/*
When a function calls itself;
A manner of reusing code;
A loop;
*/

////////////////////
// Recursive Functions
////////////////////

// Why Recursion?
// "Elegant solution to keep your code D.R.Y"(Don't Repeat Yourself)

////////////////////
// Visualing recursion in the "wild"
////////////////////

// Infinite recursion loop

// var callMe = function () {
//   callMe();
//   callMe();
//   callMe("anytime");
// };

/*
Because there is no break condition this function will execute and add to the call stack
callStack.push(callMe)
Since the first line in the function is another call to this function it will stop at line one in the main function body and infinitely call itself
*/

// base case recursion loop

var tracker = 0;

var callMe = function () {
  tracker++;
  if (tracker === 3) {
    return "loops";
  }
  callMe("anytime");
}

//callMe() // invoke function ---> callStack.push(callMe)

// inside function body
// {
//   tracker++; // tracker === 1;
//   if (tracker === 3) { // 1 is less than 3 skip "if"
//     return loops;
//   }
//   callMe("anytime"); // invoke function ---> callStack.push(callMe)
// } // function not returning anything...

// {
//   tracker++; // tracker === 2;
//   if (tracker === 3) { // 2 is less than 3 skip "if"
//     return loops;
//   }
//   callMe("anytime"); // invoke function ---> callStack.push(callMe)
// }  // function not returning anything...

// {
//   tracker++; // tracker === 3;
//   if (tracker === 3) { // 3 === 3 trigger "if"
//     return loops;  // function returning "loops" break out of recusive call
//   }
//   callMe("anytime");
// }

/* 
We expect this function to return "loops";
If we look closely, only when the condition for tracker is met does our function return "loops"
Since none of the other function calls are returning anything when the conditional is not met, ultimately we'll never get the expected "loops"
*/

// the solution:
// {
//   tracker++;
//   if (tracker === 3) {
//     return loops;
//   }
//   return callMe("anytime");
//   // ensure the function returns itself during a recursive call, this ensures that the value returned when the recursive call breaks will "bubble" to the top
// }

////////////////////
// Looping
////////////////////

var LoopNTimes = function (n) {
  console.log('n equals', n);
  if (n <= 1) {
    return 'complete';
  }
  return LoopNTimes(n - 1);
}

// LoopNTimes(2); // function invoked ---> callStack(loopNTimes)

// { // function body
//   console.log('n equals', n); // expect 'n equals 2'
//   if (n <= 1) { // 2 !<= 1 "if" skipped
//     return 'complete';
//   }
//   return LoopNTimes(n - 1); // function invoked ---> callStack(loopNTimes)
// }

// { // function body
//   console.log('n equals', n); // expect 'n equals 1'
//   if (n <= 1) { // 1 === 1 "if" conditional met
//     return 'complete'; // return 'complete'; break out of recursive call
//   }
//   return LoopNTimes(n - 1);
// }

////////////////////
// Factorial With Loop
////////////////////

/*
example: 6! === 6 * 5 * 4 * 3 * 2 * 1
*/

function factorial(n) {
  if (n === 1) return n; // set conditional to break loop
  return n * factorial(n - 1);
  // return n * n - 1 * n - 2 * n - 3 * n - 4 * ...
}
var n = 5;
factorial(n);
// returns: n * n - 1 * n - 2 * n - 3 * n - 4
// NOTE: our callStack is last in first out so n * n - 1 * n - 2 * n - 3 * n - 4 equals:

// callStack(factoral) ---> n === 5 ---> 5 * 4 * 3 * 2 * 1
// callStack(factoral) ---> n === 4 ---> 5 * n - 1 * 3 * 2 * 1
// callStack(factoral) ---> n === 3 ---> 5 * n - 1 * n - 2 * 2 * 1
// callStack(factoral) ---> n === 2 ---> 5 * n - 1 * n - 2 * n - 3 * 1
// n === 1 ---> break out of recursion, move back up stack

////////////////////
// TAKE AWAYS
////////////////////
/*
"Recursion can always be implemented as a loop, but often, especially with certain DS it is much easier to use recursion."

"Loops are more PERFORMANT than recursion in JavaScript because every function call is added to the stack, state must be preserved, etc."

Tail Call Optimization
"In other languages, you can write your recursons in a way that the engine would recognize and optimize it by refactoring into a loop. The current version of JavaScript does not implement TCO, but ES6 plans to implement this feature!"
*/


////////////////////
// BASIC RECURSION PROBLEMS
////////////////////

//1. Write a function that loops through the numbers n down to 0. If you haven't done so try using a while loop to do this.

console.log('Loop down to zero');

function loopDownToZero(n) {
  while (n > 0) {
    console.log(n--);
  }
}

loopDownToZero(5);

//2. Next, try looping just like above except using recursion

console.log('Recursion down to zero');

function recursionDownToZero(n) {
  while (n > 0) {
    console.log(n);
    return recursionDownToZero(--n); 
  }
}

recursionDownToZero(5);

//3.Write a function 'exponent' that takes two arguments base, and expo, uses a while loop to return the exponenet value of the base.

console.log('Loop to exponent');

function loopToExponent(base, expo) {
  var result = base;
  while (expo-- > 1) {
    result *= base;
  }
  return result;
}

console.log(loopToExponent(2, 3));

//4. Write a function 'RecursiveExponent' that takes two arguments base, and expo, recursively returns exponent value of the base.

console.log('Recursion to exponent');

function recursionToExponent(base, expo) {
  if (expo === 1) return base;
  return base * recursionToExponent(base, --expo);
}

console.log(recursionToExponent(2, 3));

//5. Write a function 'recursiveMultiplier' that takes two arguments, 'arr and num', and multiplies each arr value into by num and returns an array of the values.

console.log('Recursive multiplier');

function recursiveMultiplier (arr, num) {
  if (arr.length === 0) return arr;
  var last = arr.pop();
  recursiveMultiplier(arr, num);
  arr.push(last * num);
  return arr;
}

console.log(recursiveMultiplier([1,2,3], 2));

//6. Write a function 'recursiveReverse' that takes an array and uses recursion to return its contents in reverse

console.log('Recursive reverse');

function recursiveReverse (arr) {
  if (arr.length === 0) return arr;
  var last = arr.pop();
  recursiveReverse(arr);
  arr.unshift(last);
  return arr;
}

console.log(recursiveReverse([1,2,3]));

////////////////////
// MODERATE RECURSION PROBLEMS
////////////////////

// Implement factorial.

console.log('Recursive Factorial');

function factorial(n) {
  if (n === 1) return n;
  return n * factorial(--n);
}

console.log(factorial(5));

// Write a function that outputs the nth Fibonnaci number. A number in this sequence is found by adding up the two numbers before it.
// Fibonnaci's sequence:
// input    0 1 2 3 4 5 6  7  8  9 ...
// output   0 1 1 2 3 5 8 13 21 34 ...
// What is the time complexity? Can you think of optimizing your solution? (Hint: look up dynamic programming)

// O(2^n) Implementation

console.log('Recursive Fibonnaci');

function fibonnaci (n) {
  if (n === 0 || n === 1) return n;
  return fibonnaci(n - 1) + fibonnaci(n - 2);
}

console.log(fibonnaci(9));

// O(n) Implementation using Dynamic Programming

console.log('Recursive Fibonnaci using Dynamic Programming');

function fibonnaciDP(n) {
  var store = {
    0: 0,
    1: 1
  }

  function recurse(m) {
    if (store[m] === 'undefined') {
      store[m] = recurse[m-1] + recurse[m-2];
    }
    return store[m];
  }
  
  return recurse(n);
}

console.log(fibonnaciDP(9));

// Implement a function that flattens a nested array.
// flatten([1,[2],[3, [[4]]]]);
// => [1,2,3,4]

console.log('Recursive array flatten');

function flatten (arr) {
  var flat = [];
  arr.forEach((el) => {
    if (el.constructor !== Array) {
      flat.push(el);
    } else {
      flat = flat.concat(flatten(el));
    }
  });
  return flat;
}

console.log(flatten([1,[2],[3, [[4]]]]));

// Write a function that takes two numbers and returns the greatest common divisor.

