// if (x == "value1") action1();
// else if (x == "value2") action2();
// else if (x == "value3") action3();
// else defaultAction();

// switch (prompt("What is the weather like?")) {
//     case "rainy":
//       console.log("Remember to bring an umbrella.");
//       break;
//     case "sunny":
//       console.log("Dress lightly.");
//     case "cloudy":
//       console.log("Go outside.");
//       break;
//     default:
//       console.log("Unknown weather type!");
//       break;
//   }

let x = ["rainy", "sunny", "cloudy"]

for (let number = 0; number <= x.length; number++) {
    console.log('x=', x[number]);
    switch (x[number]) {
        case "rainy":
          console.log("Remember to bring an umbrella.");
          break;
        case "sunny":
          console.log("Dress lightly.");
        case "cloudy":
          console.log("Go outside.");
          break;
        default:
          console.log("Unknown weather type!");
          break;
      }
}

// x= rainy
// Remember to bring an umbrella.
// x= sunny
// Dress lightly.
// Go outside.
// x= cloudy
// Go outside.
// x= undefined
// Unknown weather type!

