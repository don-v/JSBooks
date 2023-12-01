let x = `
let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}
`;

console.log(x);

let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}

x = `
addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);
`;

console.log(x);

addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);