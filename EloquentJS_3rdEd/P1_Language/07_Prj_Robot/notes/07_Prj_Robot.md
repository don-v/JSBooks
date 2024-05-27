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

Given an array of edges, `buildGraph` creates a map object that, for each node, stores
an array of connected nodes.

It uses the `split` method to go from the road strings, which have the form `"Start-End"`,
to tow-element arrays containing the start and end as separate strings!

## THE TASK

Our robot will be moving around the village. There are parcels in various places, each 
addressed to some other place. The robot picks up parcels when it comes to them and 
delivers them when it arrives at their destinations.

The automation must decide, at each poitn, where to go next. It has finished its task
when all parcels have been delivered.

To be able to simulate this process, we must define a virtual world that can describe
it. This model tells us where the robot is and where the parcels are. When the robot
has decided to move somewhere, we need to updated the model to reflect the new situation.

If one is thinking in terms of OOP, one's first impulse might be to start defining objects
for the various elements in the world: a class for the robot, one for a parcel, maybe 
one for places. These could then hold properties that describe their current state, each as
the pile of parcels at a location, which we could change when updating the world.

This is wrong.

At least, it usually is. The fact that something sounds like an object does not automatically
mean that it should be an object in one's program. Reflexively writing classes for every
concept in one's application tends to leave one with a collection of interconnected objects
that each have their own internal changing state. Such programs are often hard to understand
and thus easy to break.

Instead, let's condense the village's state down to the minimal set of values that define it.
There's the robot's current location and the collection of undelivered parcels, each of which 
has a current location and a destination address. That's it.

And while we'r eat it, let' smake it so that we don't _change_ this state when the robot
moves but rather compute a _new_ state for the situation after the move.


<!-- HERE -- the task -->