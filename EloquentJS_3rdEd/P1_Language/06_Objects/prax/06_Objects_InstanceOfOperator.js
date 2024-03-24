let x=`console.log(
    new LengthList(1, null) instanceof LengthList);
  // → true
  console.log(new LengthList(2, null) instanceof List);
  // → true
  console.log(new List(3, null) instanceof LengthList);
  // → false
  console.log([1] instanceof Array);
  // → true`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  

console.log(
    new LengthList(1, null) instanceof LengthList);
  // → true
  console.log(new LengthList(2, null) instanceof List);
  // → true
  console.log(new List(3, null) instanceof LengthList);
  // → false
  console.log([1] instanceof Array);
  // → true