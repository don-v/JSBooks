let x = `const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];`;


console.log('*'.repeat(80).concat('\n'));
console.log(x);
  
  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

x=`function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  `;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  

  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  
x=`runRobotAnimation(VillageState.random(), routeRobot, []);`

console.log('*'.repeat(80).concat('\n'));
console.log(x);

runRobotAnimation(VillageState.random(), routeRobot, []);