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