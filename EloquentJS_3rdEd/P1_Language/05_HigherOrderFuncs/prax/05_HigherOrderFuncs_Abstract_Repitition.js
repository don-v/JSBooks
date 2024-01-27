let x = `for (let i = 0; i < 10; i++) {
    console.log(i);
  }`;

console.log(x);

for (let i = 0; i < 10; i++) {
    console.log(i);
  }

x = `function repeatLog(n) {
    for (let i = 0; i < n; i++) {
      console.log(i);
    }
  }`;

console.log(x);

function repeatLog(n) {
    for (let i = 0; i < n; i++) {
      console.log(i);
    }
  }

x = `function repeat(n, action) {
    for (let i = 0; i < n; i++) {
      action(i);
    }
  }
  
  repeat(3, console.log);
  // → 0
  // → 1
  // → 2`;

console.log(x);

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
      action(i);
    }
  }
  
  repeat(3, console.log);
  // → 0
  // → 1
  // → 2

x = `let labels = [];
repeat(5, i => {
  labels.push(Unit <dollar-sign>{i + 1}');
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]`;

console.log(x);

let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]

