let x = `
function randomPointOnCircle(radius) {
    let angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)};
  }
  console.log(randomPointOnCircle(2));
  // → {x: 0.3667, y: 1.966}
`;

console.log(x);

function randomPointOnCircle(radius) {
    let angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)};
  }
  console.log('console.log(randomPointOnCircle(2));:',randomPointOnCircle(2));
  // → {x: 0.3667, y: 1.966}

x = `
console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335
`;

console.log(x);

console.log('console.log(Math.random());:',Math.random());
// → 0.36993729369714856
console.log('console.log(Math.random());:',Math.random());
// → 0.727367032552138
console.log('console.log(Math.random());:',Math.random());
// → 0.40180766698904335

x = `
console.log(Math.floor(Math.random() * 10));
`;

console.log(x);

console.log('console.log(Math.floor(Math.random() * 10));:',Math.floor(Math.random() * 10));