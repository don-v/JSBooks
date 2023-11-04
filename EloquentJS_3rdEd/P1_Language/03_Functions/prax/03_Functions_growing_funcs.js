const x = `
007 Cows
011 Chickens
`;

console.log(x);

const y = `function printFarmInventory(cows, chickens) {
    let cowString = String(cows);
    while (cowString.length < 3) {
      cowString = "0" + cowString;
    }
    console.log('{cowString} Cows');
    let chickenString = String(chickens);
    while (chickenString.length < 3) {
      chickenString = "0" + chickenString;
    }
    console.log('{chickenString} Chickens');
  }
  printFarmInventory(7, 11);`;

console.log(y);

function printFarmInventory(cows, chickens) {
    let cowString = String(cows);
    while (cowString.length < 3) {
      cowString = "0" + cowString;
    }
    console.log(`${cowString} Cows`);
    let chickenString = String(chickens);
    while (chickenString.length < 3) {
      chickenString = "0" + chickenString;
    }
    console.log(`${chickenString} Chickens`);
  }
  printFarmInventory(7, 11);

const z = `
function printZeroPaddedWithLabel(number, label) {
    let numberString = String(number);
    while (numberString.length < 3) {
      numberString = "0" + numberString;
    }
    console.log('{numberString} {label}');
  }
  
  function printFarmInventory(cows, chickens, pigs) {
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
  }
  
  printFarmInventory(7, 11, 3);
`;

console.log(z);

function printZeroPaddedWithLabel(number, label) {
    let numberString = String(number);
    while (numberString.length < 3) {
      numberString = "0" + numberString;
    }
    console.log(`${numberString} ${label}`);
  }
  
  function printFarmInventory(cows, chickens, pigs) {
    printZeroPaddedWithLabel(cows, "Cows");
    printZeroPaddedWithLabel(chickens, "Chickens");
    printZeroPaddedWithLabel(pigs, "Pigs");
  }
  
  printFarmInventory(7, 11, 3);