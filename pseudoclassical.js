
// DEFINING A (PSEUDO) CLASS

function Building (floors) { // contructor (capitalized)
  this.what = "Buildings"; // property (notice "this" keyword)
  this.floors = floors; // property (notice "this" keyword)
}

var myHouse = new Building(3) // instantiate instance of building passing in expected argument and assigning instance to variable "myHouse". 

/*
What is the "new" keyword doing?
function Building (floors) {
  this = {}
}
*/

// adding methods for all instances
Building.prototype.countFloors = function () { 
  // defining function within constructor would create instance of countFloors function for each instance of Building. using "prototype" adds the function to the "Building" and not to individual instances of "Building"
  console.log('I have', this.floors, 'floors') // "this" references the unique instance
}

myHouse.countFloors(); // returns floors property of unique instance

console.log(myHouse);
