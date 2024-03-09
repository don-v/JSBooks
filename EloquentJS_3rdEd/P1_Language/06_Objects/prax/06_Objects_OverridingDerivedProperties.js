x=`Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log((new Rabbit("basic")).teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log((new Rabbit("basic")).teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

x=`console.log(Array.prototype.toString ==
    Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log(Array.prototype.toString ==
    Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2

x=`console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]