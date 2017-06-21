////////////////////
// SORTING
////////////////////

////////////////////
// Notes On Stability and Adaptability
////////////////////

/*
Stability: a sorting algorithm is stable if it preserves the order of equal items.

Any comparison-based sorting algorithm can be made stable by using position as a criteria when two elements are compared.

Adaptability: A sorting algorithm is "adaptive" if it becomes more efficient.

(i.e. if its complexity is reduced)

When the input is already nearly sorted.
*/

////////////////////
// Bubble Sort
////////////////////

/*
A comparison sort that repeatedly swaps adjacent elements that are out of order.
Values "bubble up" to the top of the data structure.
*/

function bubbleSort (arr) {
  var wall = arr.length; // establish an endpoint for our loop
  // Initial loop starts at index 0;
  // This outer index doesnt really matter in terms of sequence (start at 0 index or last index);
  // Its only purpose is to carry us through the array and account for our array becoming increasingly sorted at each iteration
  // Notice wall is reduced by 1 each time.
  while (wall-- > 0) {
    for (var j = 0; j < arr.length; j++) {
      // Check if the current value is lower than the one preceding it;
      // If it is, swap their positions
      // Notice we only modify the array if we have to, our algo is "Stable" for preserving the position of equal values
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

////////////////////
// Selection Sort (in place)
////////////////////

/*
Selects the smallest element in an array and pushes it into a new array.
*/

function selectionSort (arr) {
  // Start an outer loop to iterate through the array
  for (var i = 0; i < arr.length; i++) {
    // For each iteration we want to default min val and min index to the current element
    // The idea is that we assume with each iteration that we're gradually moving sorted elements to the left
    // example:
    // |1, 2] | [8, 3, 6, 4, 9, 7, 5] |
    // sorted        unsorted
    var minVal = arr[i];
    var minIdx = i;
    // While the outerloop controls the current position to be sorted;
    // The inner loop works through the array to find the next lowest value to move to the sorted "sub-array"
    // NOTICE: we initialize the loop so our iterator always starts off equal to the current index of the outer loop
    // Meaning we don't need to look at whats been sorted, only what hasn't.
    // example:
    // |          [x(current indx)    ] | ---> scope of innerloop
    // | [         x(current indx)    ] | ---> scope of outerloop
    // | [1, 2] | [8, 3, 6, 4, 9, 7, 5] |
    //   sorted        unsorted
    for (var j = i; j < arr.length; j++) {
      // At any given index starting from our outer index;
      // We're checking if an element in our unsorted "sub-array" is lower than the current outer index
      // If it is we use a greedy algo here;
      // Notice we're updating the default min val and min index our outer loop sets at each of its iterations
      // This doesn't mean this value is the lowest overall;
      // They are simply the lowest compared to the outer loops current index, and the values in the unsorted "sub-array" that have come before it
      if (arr[j] < minVal) {
        minVal = arr[j];
        minIdx = j;
      }
    }
    // So we're at index 'i' in our outerloop;
    // We assume everything before 'i' has been sorted already;
    // We've run through our inner loop for this iteration;
    // We've updated our min val and min index if we found a value in the "sub-array" lower than the current position in our outerloop
    // Now we'll make any necessary updates to the array;
    // Notice the swap below is not conditional, we do this swap for every iteration of our outerloop regardless of the inner loop finding a lower value
    // We do this, because even if the inner loop didn't find a lower value;
    // The outerloop defaulted its current position as the min value and min index
    // So it's safe to assume that is in fact the lowest value and index
    var temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  // Once the outer loop has finished we've iterated the array;
  // example:
  // | [1, 2, 4, 5, 6, 7, 8, 9] | [] |
  //           sorted          unsorted
  return arr;
}

////////////////////
// Insertion Sort (in place)
////////////////////

/*
Selects the first element in an array, considers that our sorted array of size 1. As each new element is added, insert the new element in the correct order by swapping in-place.
*/

function insertionSort (arr) {
  // We begin by initiating a loop that will allow us to walk through the array;
  // We're notionally creating a sub-array that will house our sorted values;
  // NOTICE: the starting index for our loop is 1 and not 0
  // example:
    // | [] | [                         ] | ---> scope of innerloop
    // | [                              ] | ---> scope of outerloop
    // | [] | [8, 1, 3, 6, 2, 4, 9, 7, 5] |
    //   sorted        unsorted
  for (var i = 1; i < arr.length; i++) {
    // For each iteration of our loop we're setting a variable;
    // The 'leftOfIndex' variable stores the comparison index to left of the current value which is the current index - 1
    // So for example at our first iteration:
    // 'leftOfIndex' would equal 0 (the current index - 1)
    var leftOfIndex = i - 1;
    // We'll now initiate a while loop;
    // the conditions for our while loop are:
    // 'leftOfIndex' must be greater than -1;
    // Since our outerloop's starting index is 1, the lowest value for 'leftOfIndex' will be 0;
    // As the iterator in the outerloop increases, so will the 'leftOfIndex'
    // The element at arr[leftOfIndex] must be greater than the current value in our outerloop
    while (leftOfIndex-- > -1 && arr[leftOfIndex] > arr[i]) {
      // Notice we're decreasing leftOfIndex to work our way from right to left;
      // If conditions are met for our while loop we want to swap values.
      var temp = arr[leftOfIndex];
      arr[leftOfIndex] = arr[i];
      arr[i] = temp;
      // For each instance of our while loop, notice w're reseting 'i' to the 'leftOfIndex' of that current iteration;
      // Since 'leftOfIndex' decrements each iteration for which the conditions are true;
      // 'i' gradually decreases along with it moving us back closer to the start of the outerloop
      i = leftOfIndex;
    }
  }
  // At this point our outer loop has finished;
  // For each value in our array, we ran our while loop;
  // At each time the while loop ran we compared the current value to the value to its left 
  return arr;
}

////////////////////
// Merge Sort
////////////////////

/*
Divide & Conquer
Recursive calls to a subset of the problem

Steps for Divide & Conquer:
Recognize base case
Break problem down into smaller parts during each call
Do work on each subset
Combine subsets to form solution
*/

/*
pseudocode 

function mergeSort(arr) {
  base case: if arr.length < 2, return
  break the list into halves L & R
  Lsorted = mergeSort(L)
  Rsorted = mergeSort(R)
  return merge (Lsorted, Rsorted)
}

var arr = [34, 83, 10, 9, 1, 4]

==========STACK===========
{1}
  base case: if arr.length < 2, return ---> FALSE
  break the list into halves L & R ---> L = [34, 83, 10], R = [9, 1, 4]
  Lsorted = mergeSort(L) ---> [34, 83, 10]
  Rsorted = mergeSort(R)
  return merge (Lsorted, Rsorted)

{2}
  base case: if arr.length < 2, return ---> FALSE
  break the list into halves L & R ---> L = [34], R = [83, 10]
  Lsorted = mergeSort(L) ---> [34]
  Rsorted = mergeSort(R)
  return merge (Lsorted, Rsorted)

{3}
  base case: if arr.length < 2, return ---> TRUE
  break the list into halves L & R
  Lsorted = mergeSort(L)
  Rsorted = mergeSort(R)
  return merge (Lsorted, Rsorted)

We stepped through a small glimpse of our call stack, calling mergeSort on the left half until the break case condition returned true
*/ 

function mergeSort (arr) {
  // Since we'll be using mergeSort recursively we'll need to set a break case;
  // If the length of the input array is 1 we just want to return the array.
  if (arr.length < 2) return arr;
  // Next we set some variables;
  // We set our midpoint using math.floor to account for an off number array
  var midPoint = Math.floor(arr.length / 2);
  // Slice is used to get the sub-array from index 0 up to but NOT including the midpoint
  var left = arr.slice(0, midPoint);
  // Slice is used to get the sub-array from the midpoint up to the end of the array
  var right = arr.slice(midPoint);
  // We call our merge function that will join the result of the recursive calls on each half of the input arrays
  return merge(mergeSort(left), mergeSort(right));
}

// Merge sort requires a second function that actually does the merging of the subarrays;
// As our recursive calls move back up the stack this function sorts the values
function merge (left, right) {
  // We set some variables here, 'merged' is the array where we'll add the sorted values of each half
  var merged = [];
  // We define a while loop that takes the length of the sub-arrays as its condition;
  // since we're mutating the sub-arrays, if either of their lengths reach 0 which is a falsey value the loop breaks.
  while(left.length && right.length) {
    // For each instance of the loop, check the first value in both arrays
    // If the value of the left is smaller
    if (left[0] < right[0]) {
      // We use shift to mutate and remove the first value of the left array and push the returned value of that mutation into merged.
      merged.push(left.shift());
    // If the value of the right is smaller
    } else {
      // We use shift to mutate and remove the first value of the right array and push the returned value of that mutation into merged.
      merged.push(right.shift());
    }
  }
  // Once our while loop has broken (either sub-array is empty) we return the merged array;
  // Notice we're also concating the left and right;
  // The idea here is that the while loop broke because one of the two sub-arrays were empty;
  // However the other might not be, so we'll tack on their remainders if any here using concat.
  return merged.concat(left, right);
}

////////////////////
// Quick Sort
////////////////////

/*
Divide & Conquer
Recursive calls to a subset of the problem

Steps for Divide & Conquer:
Recognize base case
Break problem down into smaller parts during each call
Do work on each subset

Detail: Partition (where/how to split the array)
Pivot point: The element that will eventually be put into the proper index.
Pivot location: The pointer that keeps track of where the list is less than on the left and greater than our pivot point on the right. Eventually becomes equal to pivot point when sorted.
*/

// function quickSort (arr) {
//   var pivot = arr[0];
//   var left =[];
//   var right = [];

//   for (var i = 1; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       right.push(arr[i]);
//     } else {
//       left.push(arr[i]);
//     }
//   }

//   return quickSort(right).concat(pivot, quickSort(left));
// }

// Initialize quick sort with 3 arguments:
// The array to be sorted
// The left index (left bound of sub-array)
// The right index (right bound of sub-array)
function quickSort(arr, lo=0, hi=arr.length - 1) {
  if (lo < hi) {
    // Call partition function on the input array;
    // the result of partition is the variable pivotLoc;
    // this index is the final pivot location
    var p = partition(arr, lo, hi);
    // sort subarrays
    quickSort(arr, lo, p-1);
    quickSort(arr, p+1, hi);
  }

  // for initial call, return sorted array
  if (hi-lo === arr.length-1) return arr;
}

// Lomuto partition scheme
function partition(arr, lo, hi) {
  // choose last element as pivot
  var pivot = arr[hi];
  // keep track of index to put pivot at
  var pivotLoc = lo;
  // iterate through subarray and if element <= pivot, place element before pivotLoc
  for (var i=lo; i<hi; i++) {
    if (arr[i] <= pivot) {
      swap(arr, pivotLoc, i);
      pivotLoc++;
    }
  }
  // move pivot to its proper location
  swap(arr, pivotLoc, hi);
  return pivotLoc;
}

function swap (arr, i1, i2) {
  if (i1 === i2) return;
  var temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

////////////////////
// Debugging Quick Sort
////////////////////

/*

function quickSort(arr, lo, hi) { ---> [5, 3, 1, 4, 2]
  if (lo === undefined) lo = 0; ---> initial call truthy
  if (hi === undefined) hi = arr.length - 1 ---> initial call truthy
  
  if (lo < hi) { ---> 0 < 4 // TRUE
    var p = partion(arr, lo, hi); ---> [5, 3, 1, 4, 2], 0, 4 

                (JUMP INTO PARTITION FUNCTION)
==============================================================
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
  if (hi - lo === arr.length - 1) return arr;
}



function partition(arr, lo, hi) { ---> [5, 3, 1, 4, 2], 0, 4
  var pivot = arr[hi] ---> 2
  var pivotLoc = lo; ---> 0
  
  for (var i = lo; i < hi; i++) { ---> 0 to 4
    if (arr[i] <= pivot) {
      swap(arr, pivotLoc, i);
      pivotLoc++;
    }
  }
                    (JUMP INTO FOR LOOP)
==============================================================
  swap(arr, pivotLoc, hi);
  return pivotLoc;
}



I === 0
for (var i = lo; i < hi; i++) { ---> 0 to 4
  if (arr[i] <= pivot) { ---> 5 <= 2 // FALSE
    swap(arr, pivotLoc, i);
    pivotLoc++;
  }
}



I === 1
for (var i = lo; i < hi; i++) { ---> 0 to 4
  if (arr[i] <= pivot) { ---> 3 <= 2 // FALSE
    swap(arr, pivotLoc, i);
    pivotLoc++;
  }
}



I === 2
for (var i = lo; i < hi; i++) { ---> 0 to 4
  if (arr[i] <= pivot) { ---> 1 <= 2 // TRUE
                  (JUMP INTO IF STATEMENT)
==============================================================
    swap(arr, pivotLoc, i);
    pivotLoc++;
  }
}



if (arr[i] <= pivot) { ---> 1 <= 2 // TRUE
  swap(arr, pivotLoc, i);
                  (JUMP INTO SWAP FUNCTION)
==============================================================
  pivotLoc++;
}



function swap (arr, i1, i2) { ---> [5, 3, 1, 4, 2], 0, 2
  if (i1 === i2) return; ---> 0 === 2 // FALSE
  var temp = arr[i1]; ---> 5
  arr[i1] = arr[i2]; ---> [1, 3, 1, 4, 2]
  arr[i2] = temp; ---> [1, 3, 5, 4, 2]
}



                (JUMP BACK UP TO FOR LOOP)
==============================================================
I === 3
for (var i = lo; i < hi; i++) { ---> 0 to 4
  if (arr[i] <= pivot) { ---> 4 <= 2 // FALSE
    swap(arr, pivotLoc, i);
    pivotLoc++;
  }
}



            (JUMP BACK UP TO PARTITION FUNCTION)
==============================================================
function partition(arr, lo, hi) { ---> [5, 3, 1, 4, 2], 0, 4
  var pivot = arr[hi] ---> 2
  var pivotLoc = lo; ---> 0
  
  for (var i = lo; i < hi; i++) { ---> 0 to 4
    if (arr[i] <= pivot) {
      swap(arr, pivotLoc, i);
      pivotLoc++;
    }
  }

  swap(arr, pivotLoc, hi);
                  (JUMP INTO SWAP FUNCTION)
==============================================================
  return pivotLoc;
}



function swap (arr, i1, i2) { ---> [1, 3, 5, 4, 2], 1, 4
  if (i1 === i2) return; ---> 0 === 2 // FALSE
  var temp = arr[i1]; ---> 3
  arr[i1] = arr[i2]; ---> [1, 2, 1, 4, 2]
  arr[i2] = temp; ---> [1, 2, 5, 4, 3]
}



            (JUMP BACK UP TO PARTITION FUNCTION)
==============================================================
function partition(arr, lo, hi) { ---> [5, 3, 1, 4, 2], 0, 4
  var pivot = arr[hi] ---> 2
  var pivotLoc = lo; ---> 0
  
  for (var i = lo; i < hi; i++) { ---> 0 to 4
    if (arr[i] <= pivot) {
      swap(arr, pivotLoc, i);
      pivotLoc++;
    }
  }

  swap(arr, pivotLoc, hi);
  return pivotLoc; ---> 1
}



            (JUMP BACK UP TO QUICK SORT FUNCTION)
==============================================================
function quickSort(arr, lo, hi) { ---> [5, 3, 1, 4, 2]
  if (lo === undefined) lo = 0; ---> initial call truthy
  if (hi === undefined) hi = arr.length - 1 ---> initial call truthy
  
  if (lo < hi) { ---> 0 < 4 // TRUE
    var p = partion(arr, lo, hi); ---> P === 1
    quickSort(arr, lo, p - 1); ---> [1, 2, 5, 4, 3], 0, 0
    quickSort(arr, p + 1, hi); ---> [1, 2, 5, 4, 3], 2, 4
  }
  if (hi - lo === arr.length - 1) return arr;
}
*/

function bubbleSort (arr) {
  var edge = arr.length;

  while (edge-- > 0) {
    for (var i = 0; i < edge; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  console.log('Practice bubble 4');
  return arr;
}

function selectionSort (arr) {
  for (var i = 0; i < arr.length; i++) {
    var minVal = arr[i];
    var minIdx = i;

    for (var j = i; j < arr.length; j++) {
      if (arr[j] < minVal) {
        minVal = arr[j];
        minIdx = j;
      }
    }
    var temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  console.log('Practice selection 4');
  return arr;
}

function insertionSort (arr) {
  for (var i = 1; i < arr.length; i++) {
    var leftOfIndex = i - 1;

    while (leftOfIndex > -1 && arr[leftOfIndex] > arr[i]) {
      var temp = arr[leftOfIndex];
      arr[leftOfIndex] = arr[i];
      arr[i] = temp;
      i = leftOfIndex;
      leftOfIndex--;
    }
  }
  console.log('Practice insertion 4');
  return arr;
}

function mergeSort (arr) {
  if (arr.length < 2) return arr;
  var midpoint = Math.floor(arr.length / 2);
  var left = arr.slice(0, midpoint);
  var right = arr.slice(midpoint);
  console.log('Practice mergesort 4')
  return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
  var merged = [];

  while (left.length && right.length) {
    left[0] < right[0] ? merged.push(left.shift()) : merged.push(right.shift());
  }
  console.log('Practice merge 4');
  return merged.concat(left, right);
}

function quickSort (arr, lo=0, hi=arr.length - 1) {
  if (lo < hi) {
    var p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
  console.log('Practice quick 4');
  if (hi-lo === arr.length - 1) return arr;
}

function partion (arr, lo, hi) {
  var pivot = arr[hi];
  var pivotLoc = lo;

  for (var i = lo; i < hi; i++) {
    if (arr[i] > pivot) {
      swap(arr, pivotLoc, i);
      pivotLoc++;
    }
  }
  swap(arr, pivotLoc, hi);
  console.log('Practice partion 4');
  return pivotLoc;
}

function swap(arr, i1, i2) {
  if (i1 === i2) return;
  var temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
  console.log('Practice swap 4');
}

var arr = [8, 5, 3, 9, 6, 5, 4, 5, 1]; 
var sorted = [1, 3, 4, 5, 5, 5, 6, 8, 9];

console.log(`Input: ${arr}`);
console.log(`Sorted: ${sorted}`);

console.log(`Bubble Sort: ${bubbleSort(arr)}`);
console.log(`Selection Sort: ${selectionSort(arr)}`);
console.log(`Insertion Sort: ${insertionSort(arr)}`);
console.log(`Merge Sort: ${mergeSort(arr)}`);
console.log(`Quick Sort: ${quickSort(arr)}`);
