console.log('console.log(0);:',0);
console.log('console.log(2);:',2);
console.log('console.log(4);:',4);
console.log('console.log(6);:',6);
console.log('console.log(8);:',8);
console.log('console.log(10);:',10);
console.log('console.log(12);:',12);

let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// → 0
// → 2
//   … etcetera

let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);
// → 1024