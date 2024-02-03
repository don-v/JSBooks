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
// number of living scripts: 83

x = `console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]`;

console.log(x);

// console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]
console.log('number of scripts that are "ttb":',SCRIPTS.filter(s => s.direction == "ttb").length);
// number of scripts that are "ttb": 3
console.log('scripts that are "ttb":',SCRIPTS.filter(s => s.direction == "ttb"));
/* 
scripts that are "ttb": [
  {
    name: 'Mongolian',
    ranges: [
      [Array], [Array],
      [Array], [Array],
      [Array], [Array],
      [Array]
    ],
    direction: 'ttb',
    year: 1204,
    living: false,
    link: 'https://en.wikipedia.org/wiki/Mongolian_script'
  },
  {
    name: 'Phags-pa',
    ranges: [ [Array], [Array] ],
    direction: 'ttb',
    year: 1269,
    living: false,
    link: 'https://en.wikipedia.org/wiki/%27Phags-pa_script'
  },
  {
    name: 'SignWriting',
    ranges: [ [Array], [Array], [Array] ],
    direction: 'ttb',
    year: 1974,
    living: true,
    link: 'https://en.wikipedia.org/wiki/SignWriting'
  }
]
*/