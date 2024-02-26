let x = `let rabbit = {};
rabbit.speak = function(line) {
  console.log("he rabbit says '<dollar-sign>{line}'");
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'`;

console.log(x);

let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'