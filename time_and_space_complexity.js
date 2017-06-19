////////////////////
// TIME COMPLEXITY
////////////////////

/*
What makes an algorithm "fast"?
Complexity of algorithms can be thought of in two fasions, "Space" & "Time"
Space Complexity - How much memory is used? How large are the data sets used/created?
Time Complexity - How fast are operations being made? How many comparisons are made? How many swaps are made? 
*/


////////////////////
// Time Complexity Algorithms
////////////////////

/*
Big-O Name   # of   Ops Algorithm
quadratic    n^2    compare all numbers to one another (nested for loops)
linear       2n     find min and max numbers ("greedy" algorithm)
constant     "2"    constant time, (sorted list, find first and last)

In order of speed:
(SUPER FAST)   constant      O(1)
               logarithmic   O(logn)
               linear        O(n)
               quadratic     O(n^2)
(SUPER SLOW)   exponential   O(x^n)
*/

////////////////////
// Native JS Methods
////////////////////

/*
arr.push() ---> O(1)
arr.pop() ---> O(1)
1 + 3 ---> O(1)
for(i = 0; i < arr.length; i++) {} ---> O(n)
arr.unshift() ---> O(n)
*/

////////////////////
// Multiple Expressions/Loops/Etc
////////////////////

/*
for(i = 0; i < arr.length; i++) {   O(n)
 1 + 1                              O(1)
}

O(n) + O(1) = O(n + 1) = O(n)

for(i = 0; i < arr.length; i++) {     O(n)
  for(i = 0; i < arr.length; i++) {   O(n)
    1 + 1                             O(1)
    2 + 2                             O(1)
  }
}

O(n) * O(n) + O(1) + O(1) = O(n^2) + O(2) = O(2n^2) = O(n^2)
*/

////////////////////
// Understnading O(logn)
////////////////////

/*
Example: Binary Search

Scenerio: 
Looking up word in the dictionary;
We flip to a certain page;
If the word comes before or after that page we only need to check those pages that come before or after it;
For example:
Looking for letter "b" and we flip to "e"
[a,b,c,d,e,f,g] --->  [a,b,c,d]
Now we flip to "c"
[a,b,c,d] ---> [a,b]
Finally we flip to "a"
[a,b] ---> [b]
We find "b" by cutting our search each time
*/

////////////////////
// Common Operations
////////////////////

/*
Running a statement                             O(1)
Value look-up on an array/object/variable       O(1)
Loop that cuts problem in half each iteration   O(logn)
Looping through the values of an array          O(n)
Double nested loops                             O(n^2)
Triple nested loops                             O(x^3)
*/

////////////////////
// TAKE AWAYS
////////////////////

/*
"Time complexity of an algorithm signifies the total time required by the program to run to completion. The time complexity of algorithms is most commonly expressed using the big O notation."

"Big O notation gives us an industry-standard language to discuss the performance of algorithms. Not knowing how to speak this language can make you stand out as an inexperienced programmer."
*/
