/* Write an ES module based on the example from *C7* that contains the array of 
roads and exports the graph data structure representing them as `roadGraph`. It 
depends on a module *./graph.js* that exports a function `buildGraph`, used to 
build the graph. This function expects an array of two-element arrays (the start 
and end points of the roads). */

// Add dependencies and exports

// *graph.js*:

// export function buildGraph(edges) {
//   let graph = Object.create(null);
//   function addEdge(from, to) {
//     if (graph[from] == null) {
//       graph[from] = [to];
//     } else {
//       graph[from].push(to);
//     }
//   }
//   for (let [from, to] of edges.map(r => r.split("-"))) {
//     addEdge(from, to);
//     addEdge(to, from);
//   }
//   return graph;
// }

export function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}



// *es_module.js*:

// import buildGraph from "./graph.js";

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function getRoadsFromTo(roads_array) {
  return roads_array.map(r => r.split("-"));  
}

const edges = getRoadsFromTo(roads);
console.log(buildGraph(edges));