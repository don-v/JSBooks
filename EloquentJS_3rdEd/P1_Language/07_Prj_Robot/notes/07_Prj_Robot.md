# C7: PROJECT: A ROBOT

"[...] the question of whether Machines Can Think [...] is about as relevant as the question of whether Submarines Can Swim." --Edsger Dijkstra, _The Threats to Computing Science_.

In "project" chapters, teach'll stop pummeling one with new theory for a brief moement, and instead we'll work thorugh a program together. Theory is necessary to learn to program, but reading and undertanding acual programs is just as important.

Our project in this chapter is to build an automaton, a little programt that performs a task
in a virtual world. Our automaton will be a mail-delivery robot picking up and dropping off
parcels.

## MEADOWFIELD

The village of Meadowfield isn't bery big. It consists of 11 places with 14 roads between them. It
can be described with this array of roads:

```js
const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
```

![meadowmong village](../../../to_ignore/07_Prj_Robot/meadowmont.png)

The network of roads in the village forms a _graph_. A graph is a collection of
points (places in the village) with lines between them (roads). This graph will
be the world that our robot moves through.

The array of strings isn't very easy to work with. What we're interested in is
the destinations that we can reach from a given place. Let's convert the list
of roads to a data structure that, for each place, tells us what can be reached
from there.

```js
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
```

<!-- HERE -- meadowfield++ -->