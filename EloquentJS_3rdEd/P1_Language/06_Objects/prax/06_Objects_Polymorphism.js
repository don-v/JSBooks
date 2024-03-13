let x = `Rabbit.prototype.toString = function() {
    return <back-tick>a <dollar-sign>{this.type} rabbit<back-tick>;
  };
  
  console.log(String(killerRabbit));
  // → a killer rabbit`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  
Rabbit.prototype.toString = function() {
return `a ${this.type} rabbit`;
};

console.log(String(killerRabbit));
// → a killer rabbit

x=`Array.prototype.forEach.call({
  length: 2,
  0: "A",
  1: "B"
}, elt => console.log(elt));
// → A
// → B`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

Array.prototype.forEach.call({
  length: 2,
  0: "A",
  1: "B"
}, elt => console.log(elt));
// → A
// → B