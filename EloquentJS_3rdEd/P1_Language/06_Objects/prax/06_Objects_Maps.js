let x =`let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
  };
  
  console.log(<backtick>Júlia is <dollar-sign>{ages["Júlia"]}<backtick>);
  // → Júlia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // → Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  
  

let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
  };
  
  console.log(`Júlia is ${ages["Júlia"]}`);
  // → Júlia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // → Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true