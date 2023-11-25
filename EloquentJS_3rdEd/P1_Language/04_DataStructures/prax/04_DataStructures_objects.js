let x = `
let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
  };
  console.log(day1.squirrel);
  // → false
  console.log(day1.wolf);
  // → undefined
  day1.wolf = false;
  console.log(day1.wolf);
  // → false
`;

console.log(x);

let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
  };
  console.log(day1.squirrel);
  // → false
  console.log(day1.wolf);
  // → undefined
  day1.wolf = false;
  console.log(day1.wolf);
  // → false

x1 = `
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};
`;

console.log(x1);

let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};

console.log('descriptions:',descriptions);

x2 = `
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
`;

console.log(x2);

let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true

let x3 = `
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
`;

console.log(x3);

console.log('console.log(Object.keys({x: 0, y: 0, z: 2}));:',Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
