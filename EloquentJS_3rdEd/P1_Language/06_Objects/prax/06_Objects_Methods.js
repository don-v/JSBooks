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

x= `function speak(line) {
  console.log(<backtick-open>he <dollar-sign>{this.type} rabbit says '<dollar-sign>{line}'<backtick-close>);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'`;

console.log(x);

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'

x=`speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'`;

console.log(x);

speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'

