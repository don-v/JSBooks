let x = `let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);


let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5