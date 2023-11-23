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

x = `
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};
`;

let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};

console.log('descriptions:',descriptions);

