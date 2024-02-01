require('./../../../to_ignore/05_HigherOrderFuncs/scripts.js');

let x = `function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }
  
  console.log(filter(SCRIPTS, script => script.living));
  // → [{name: "Adlam", …}, …]`;

console.log(x);

function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }
  
//   console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
console.log('number of living scripts:',filter(SCRIPTS, script => script.living).length);