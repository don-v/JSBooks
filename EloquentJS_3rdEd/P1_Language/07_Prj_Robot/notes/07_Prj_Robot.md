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

And while we're at it, let' smake it so that we don't _change_ this state when the robot
moves but rather compute a _new_ state for the situation after the move.

```js
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}
```

The `move` method is where the action happens. It first checks whether
there is a road going from the current place to the destination, and if 
not, it returns the old state since this is not a valid move.

Then it creates a new state with the destination as the robot's new place.
But it also needs to create a new set o fparcels -- parcels that the robot
is carrying (that are at the robot's current place) need to be moved along
to the new place. And parcels that are addressed to the new place need to
be delivered -- that is, they need to be removed from the set of undelivered
parcels. The call to `map` takes care of the moving, and the call to `filter`
does the delivering. 

Parcel objects aren't changed when they are moved but re-created. The 
`move` method gives us a new village state but leaves the old one entirely
intact.

```js
let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office
```

The move causes the parcel to be delivered, and this is reflected in the next state. 
But the initial state still describes the situation where the robot is at the post ofice
and the parcel is undelivered. 

## PERSISTENT DATA

Data structures that don't change are called _immutable_ or _persistent_. They behave
a lot like strings and numbers in that they are who they are and stay that way, rather
than containing different things at different times.

In JS, just about everything _can_ be changed, so working with values that are supposed
to be persistent requires some restraint. There is a function called `Object.freeze` that
changes an object so that writing to its properties is ignored. One could use that to 
make sure one's objects aren't changed, if one wants to be careful. Freezing does require
the computer to do extra work, and having updates ignored is just about as likely to
confuse someone as having them to do the wrong thing. So teach usually prefers to just
tell people that a given object shouldn't be messed with and hopes they remember it.

```js
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5
```

Why would one go out of his/her way to not change objects when the language is obviously
expecting me to?

Because it helps one undertand one's programs. This is about complexity management again.
When the objects in the system are fixed, stable things, teach can consider operations 
on them in isolation -- moving to Alices' house from a given start state always produces 
the same new state. When objects change over time, that adds a whole new dimension of 
complexity to this kind of reasoning.

For a small system like the one we are building in this chpater, we could handle that bit of
extra complexity. But the most important limit on what kind of system we can build is how
much we can understand. Anything that makes one's code easier to understand makes it possible
to build a more ambitious system.

Unfortunately, although understanding a system built on persistent data structures is easier,
_designing_ one, especially when one's programming language is not helping, can be a bit
more dificult. We'll look for opportunities to use persistent data structures in this book,
but we'll also be using changeable ones.

## SIMULATION

<!-- HERE -- SIMULATION -->