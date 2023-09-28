console.log(`let counter = 0;`);
let counter = 0;
console.log(`counter = counter + 1;`);
counter = counter + 1;
console.log('counter: ',counter);
console.log(`counter += 1;`);
counter += 1;
console.log('counter: ',counter);

console.log(`let result = 2;`);
let result = 2;
console.log(`result: `, result);
console.log(`result *= 2`);
result *= 2;
console.log(`result: `, result);

console.log(`counter -= 1;`);
counter -= 1;
console.log('counter: ',counter);


let z = `for (let number = 0; number <= 12; number += 2) {
    console.log(number);
  }`;

console.log(z);

for (let number = 0; number <= 12; number += 2) {
    console.log(number);
  }


/* 
let counter = 0;
counter = counter + 1;
counter:  1
counter += 1;
counter:  2
let result = 2;
result:  2
result *= 2
result:  4
counter -= 1;
counter:  1
for (let number = 0; number <= 12; number += 2) {
    console.log(number);
  }
0
2
4
6
8
10
12
*/