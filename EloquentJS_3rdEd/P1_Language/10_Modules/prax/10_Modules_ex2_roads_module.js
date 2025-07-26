/* Write an ES module based on the example from *C7* that contains the array of 
roads and exports the graph data structure representing them as `roadGraph`. It 
depends on a module *./graph.js* that exports a function `buildGraph`, used to 
build the graph. This function expects an array of two-element arrays (the start 
and end points of the roads). */

// Add dependencies and exports

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

