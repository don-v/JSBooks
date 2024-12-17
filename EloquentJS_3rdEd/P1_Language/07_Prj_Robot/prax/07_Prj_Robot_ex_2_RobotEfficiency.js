/* 
Can you write a robot that finished the delivery task faster than `goalOrientedRobot`?
If one observes that robot's behavior, what obviously stupid things does it do? How
could this be improved?

If one solved the previous exercise, one might wan tto use one's `compareRobots`
function to verify the new robot outperforms `goalOrientedRobot`.
*/

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];



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

// console.log('roadGraph:\n', roadGraph);

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


VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};


function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function runRobot_(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

// *************************randomRobot***********************************
// ***********************************************************************

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}


// ***************************routeRobot**********************************
// ***********************************************************************

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// ****************************goalOrientedRobot**************************
// ***********************************************************************

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function findRoute_(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        let temp_route = route;
        console.log(`adding ${place} to the route array before returning route:`)
        console.log({place, route: temp_route.concat(place)})
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        let temp_route2 = route;
        console.log(`adding ${place} to the route array then pushing object with update route property to work array`)
        console.log({at: place, route: temp_route2.concat(place)})
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}


function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

// ****************************myRobot**************************
// ***********************************************************************

/* Instead of selecting the first parcel in the randomlyl generated
list, let's instead use the `findRoute` function to calculate all of 
the routes from current `place` to the `parcel.place` for each 
parcel. Then measure the length of each route, and choose the 
closest as the parcel we select */

// let's write a funciton to do that!
function selectParcel(place, parcels) {
  
  let routeCollection = [];

  parcels.forEach(parcel => {
    route = findRoute(graph, place, parcel.place)
    routeCollection.push(
      {placeLocation: parcel.place, 
        distanceToParcelLocation: route.length})
  });

  // array.sort((a, b) => a.distance - b.distance);
}

// HERE!

/* 
output for 3 examples:

Moved to Alice's House
Moved to Bob's House
Moved to Town Hall
Moved to Marketplace
Moved to Town Hall
Moved to Daria's House
Moved to Town Hall
Moved to Bob's House
Moved to Alice's House
Moved to Cabin
Moved to Alice's House
Moved to Bob's House
Moved to Town Hall
Moved to Shop
Moved to Marketplace
Moved to Post Office
Done in 16 turns
goalOrientedRobot: 16
********************************************************************************

Moved to Alice's House
Moved to Bob's House
Moved to Town Hall
Moved to Daria's House
Moved to Town Hall
Moved to Marketplace
Moved to Post Office
Moved to Alice's House
Moved to Bob's House
Moved to Town Hall
Moved to Shop
Moved to Grete's House
Moved to Farm
Moved to Marketplace
Moved to Post Office
Moved to Alice's House
Done in 16 turns
goalOrientedRobot: 16
********************************************************************************

Moved to Marketplace
Moved to Town Hall
Moved to Bob's House
Moved to Alice's House
Moved to Cabin
Moved to Alice's House
Moved to Bob's House
Moved to Town Hall
Moved to Shop
Moved to Grete's House
Moved to Ernie's House
Moved to Daria's House
Moved to Town Hall
Moved to Shop
Moved to Town Hall
Moved to Bob's House
Done in 16 turns
goalOrientedRobot: 16
********************************************************************************
*/




// let state = VillageState.random()
let state = new VillageState("Post Office", [
  { place: 'Town Hall', address: 'Farm' },
  { place: 'Cabin', address: 'Town Hall' },
  { place: 'Post Office', address: 'Farm' },
  { place: "Alice's House", address: 'Post Office' },
  { place: "Alice's House", address: 'Post Office' }
]);

console.log(state);
console.log(`state.place: ${state.place}; state.parcels: ${state.parcels}`)

runRobot(state, goalOrientedRobot, []);
console.log('goalOrientedRobot:',runRobot_(state, goalOrientedRobot, []));


let x = `// Your code here

runRobotAnimation(VillageState.random(), yourRobot, memory);`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

function compareRobots(robot1, memory1, robot2, memory2) {
    // Your code here
    // create 100 tasks
    const numTasks = 100;
    taskSet = new Array;
    for (let index = 0; index < numTasks; index++) {
      taskSet.push(VillageState.random())
      }
    // collect results for each robot for all 100 takss, so we can 
    // average them at the end:
    robot1Results = new Array;
    robot2Results = new Array;
    taskSet.forEach(element => {
      robot1Results.push(runRobot_(element, robot1, memory1))
      robot2Results.push(runRobot_(element, robot2, memory2))
    });
    // calcualte the average number of turns for each robot using the
    // saved results.
    function getAverage(arr) {
      let total = 0;
      for (let index = 0; index < arr.length; index++) {
        total += arr[index];      
      }
      return total/arr.length;
    }
    return {robot1Avg: getAverage(robot1Results), robot2Avg: getAverage(robot2Results)}
  }
  
  // const results = compareRobots(routeRobot, [], goalOrientedRobot, []);
  // console.log(results);