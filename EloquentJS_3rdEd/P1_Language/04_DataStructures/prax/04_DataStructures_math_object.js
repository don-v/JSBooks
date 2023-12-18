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

