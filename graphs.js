////////////////////
// GRAPHS
////////////////////

/*
A collection/set of vertices connected by edges;
A data structure really good at representing relationships, not just hierarchical but any relationships;

Each item in a graph contains:
  - Stored data - aka node value
  - Stored reference - aka relationships aka edges; to zero or more other nodes;
*/

/*
Terminology
Edges: 
  - Represent the connection between 2 vertices;
  - Can be directed or undirected;
    - Directed: can only travel in one direction;
    - Undirected: can travel in either direction; 
Vertices:
  - Nodes in the graph;
  - Contain data;
Path: 
  - A sequence of connected vertices;
  - A simple path has no repeated vertices
Cycle:
  - A path that is cyclical;
    - Has path leading back to 'origin' vertice
  - An acyclic graph has no cycles;
*/

/*
Common Operations
- Adding edge;
- Deleting an edge;
- Detecting an edge;
- Finding the neighbors of a vertex;
- Finding a path between two vertices;
*/

/*
Representing Graphs
Adjaceny Matrix (Undirected Graph)

   1  2  3  4  5  6                      1
1  0  1  1  0  0  0                     /   \
2  1  0  0  1  0  0                    2      3
3  1  0  0  1  0  0                     \   /
4  0  1  1  0  1  0                      4      6
5  0  0  0  1  0  1                       \   /
6  0  0  0  0  1  0                         5

Representing Graphs
Adjaceny Matrix (Directed Graph)

   1  2  3  4  5  6                      1
1  0  1  1  0  0  0                     /   \
2 -1  0  0  1  0  0                    2      3
3 -1  0  0  1  0  0                     \   /
4  0 -1 -1  0  1  0                      4      6
5  0  0  0 -1  0  1                       \   /
6  0  0  0  0 -1  0                         5

Representing Graphs
Adjaceny Matrix (Weighted Directed Graph)

   1  2  3  4  5  6                      1
1  0  1  1  0  0  0                     /   \
2 -1  0  0  1  0  0                    2      3
3 -1  0  0  1  0  0                     \   /
4  0 -1 -1  0  1  0                      4      6
5  0  0  0 -1  0  1                       \   /
6  0  0  0  0 -1  0                         5
*/

/*
Pseudocoding the Matrix Constructor

Constructor
  - Initialize a matrix
    (in comp sci matrixes are represented by nested arrays)

  addNode()
    (Assume node is positive int 0-10)
    (How do we add the node?)
      (Do we add to an already-existing matrix?)
      (Do we add a column/row each time)

  addEdge(v1, v2)
    - matrix[2,4] = 1
    - matrix[4,2] = 1

*/

function Graph () {
  // allows for constant time lookup of values;
  this._nodes = {}; 
}

Graph.prototype.addNode = function (val) {
  // add catch if a value is not passed in;
  if (val === undefined) return;
  // add key to node object, have it equal itself or empty array
  this._nodes[val] = this._nodes[val] || [];
}

Graph.prototype.removeNode = function (val) {
  // remove any indicators of a node from the list by removing it from any other nodes list of edges
  // iterate through a specified nodes list of edges
  this._nodes[val].forEach(function(neighbor) {
    // for each of it's edges find that edge's edges
    var neighborsNeighbors = this._nodes[neighbor];
    // in it's edge's edges find it's relationship indicated by it's presence in their lists
    var idx = neighborsNeighbors.indexOf(val);
    // for each of it's edge's edges remove itself from their relationships
    neighborsNeighbors.splice(idx, 1)
  });
  delete this._nodes[val];
}

Graph.prototype.contains = function (val) {
  // check the list of nodes for that property name
  return this._nodes[val] !== undefined;
}

Graph.prototype.addEdge = function (val1, val2) {
  // add catch if either value doesn't currently exist;
  if (!this._nodes[val1] || !this._nodes[val2]) return 'Invalid node value';
  // unidirected graph, so relationship is added both ways
  this._nodes[val1].push(val2);
  this._nodes[val2].push(val1);
}

Graph.prototype.removeEdge = function(val1, val2) {
  // add catch if either value does't currently exist;
  if (!this._nodes[val1] || !this._nodes[val2]) return 'Invalid node value';
  // gather all of val1's edges
  var val1Neighbors = this._nodes[val1];
  // remove val2 from this array
  val1Neighbors.splice(val1Neighbors.indexOf(val2), 1);
  // gather all of val2's edges
  var val2Neighbors = this._nodes[val2];
  // remove val1 from this array
  val2Neighbors.splice(val2Neighbors.indexOf(val1), 1);
}

Graph.prototype.hasEdge = function (val1, val2) {
  return this._nodes[val1].indexOf(val2) > -1;
}

Graph.prototype.forEach = function (fn) {
  // iterate through nodes object
  for (var node in this._nodes) {
    // for each property in the nodes object, call the callback function
    // pass in:
      // - the key (property name)
      // - the array of edges for a given node
      // - the object containing all nodes
    fn(node, this._nodes[node], this._nodes);
  }
}

// initiate traverse depth first function with default arguments, a val to opperate on, a callback, the visited object, and the distance/number of levels traversed
Graph.prototype.traverseDepthFirst = function(val, fn, visited={}, distance=0) {
  // check that val exists in node list;
  // check that fn is in fact a fn;
  if (!this._nodes[val] || typeof fn !== 'function') return 'Invalid value or function';
  // call callback on the value;
  fn(value, distance);
  // set that val in visited as true;
  visited[val] = true;
  // iterate through the current nodes array of edges;
  this._nodes[val].forEach(function(neighbor) {
    // check if an edge has already been visited by referencing visisted object;
    // if it has, return out;
    if (visited[neighbor]) return;
    // recursively call traverse depth first on the current edge passing down the callback, the visisted object, and incrementing the depth traversed;
    this.traverseDepthFirst(neighbor, fn, visited, distance+1);
  // bind 'this' to scope;
  }, this);
}

Graph.prototype.traverseBreadthFirst = function (val, fn) {
  if (!this._nodes[val] || typeof fn !== 'function') return 'Invalid value or function';
  var visisted = {};
  var queue = [val];
  visisted[val] = 0;
  while (queue.length) {
    var node = queue.shift();
    fn(node, visisted[node]);
    var neighbors = this._nodes[node].filter(function(neighbor) {
      if (visisted[neighbor] === undefined) {
        visisted[neighbor] = visisted[node]+1;
        return true;
      }
    });
    queue = queue.concat(neighbors);
  }
}

var myGraph = new Graph();
console.log('GRAPHS!');
console.log(JSON.stringify(myGraph, null, 4));
myGraph.addNode('JavaScript');
myGraph.addNode('Ruby');
myGraph.addNode('Python');
console.log(JSON.stringify(myGraph, null, 4));
myGraph.addEdge('Ruby', 'JavaScript');
console.log(JSON.stringify(myGraph, null, 4));

/*
Graph Traversing

Why?:
  - Find paths, cycles, connectivity and more!
Concepts:
  - Explored (black)
  - Visited (gray)
  - Undiscovered(white)

Depth-First Search
- Think in-order traversal with binary trees;
  - Traverse to depth, then gradually up and over;
*/

/*
Pseudocoding Depth-First Search on Graph

   1  2  3  4  5  6                      1
1  0  1  1  0  0  0                     /   \
2 -1  0  0  1  0  0                    2      3
3 -1  0  0  1  0  0                     \   /
4  0 -1 -1  0  1  0                      4      6
5  0  0  0 -1  0  1                       \   /
6  0  0  0  0 -1  0                         5

(Recursively)
- Visit 1
  - Visit 2
    - Visit 4
      - Visit 5
        _ Visit 6

Once no more unexplored nodes, return

Each node needs to be visited and be marked as explored

}
  Base case: 
    - If it has been explored
      - No where to go (empty list)
  
  for i, loop through arr of edges
    traverse(this._nodes[val][i])
}
*/

/*
Breadth-First Search
- Traverse graph or tree by branching out then down;
- Path starts at root node;
  - Down a level and opperate linearly on child nodes;

Procedure:
- Create a queue;
- Mark value as discovered(grey), and enqueue value into queue;
- While queue is not empty, perform the following steps:
  - Dequeue from queue;
  - Mark as discovered(grey);
  - Enueue all unvisisted(white) neighbors/edges;
  - Mark as explored;


Pseudocoding Depth-First Search on Graph

   1  2  3  4  5  6                      1
1  0  1  1  0  0  0                     /   \
2 -1  0  0  1  0  0                    2      3
3 -1  0  0  1  0  0                     \   /
4  0 -1 -1  0  1  0                      4      6
5  0  0  0 -1  0  1                       \   /
6  0  0  0  0 -1  0                         5

*/
