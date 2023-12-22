let x = `
{
    "squirrel": false,
    "events": ["work", "touched tree", "pizza", "running"]
  }
`;

console.log(x);

x = `
let string = JSON.stringify({squirrel: false,
    events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
`;

console.log(x);

let string = JSON.stringify({squirrel: false,
    events: ["weekend"]});
console.log('console.log(string);:',string);
// → {"squirrel":false,"events":["weekend"]}
console.log('console.log(JSON.parse(string).events);',JSON.parse(string).events);
// → ["weekend"]


