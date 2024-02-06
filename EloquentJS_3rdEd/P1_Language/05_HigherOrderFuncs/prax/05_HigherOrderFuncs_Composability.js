require('./../../../to_ignore/05_HigherOrderFuncs/scripts.js');

let x = `function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  
  console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
  // → 1165
  console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
  // → 204`;

console.log(x);

function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  
  console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
  // → 1165
  console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
  // → 204

x = `function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  
  console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
  // → 1165
  console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
  // → 204
  `;

console.log(x);

function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  
  console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
  // → 1165
  console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
  // → 204
  