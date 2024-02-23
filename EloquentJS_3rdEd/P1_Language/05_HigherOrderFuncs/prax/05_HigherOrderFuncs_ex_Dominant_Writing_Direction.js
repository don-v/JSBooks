require('./../../../to_ignore/05_HigherOrderFuncs/scripts.js');

/* Write a function that computes the dominatn writing direction in a string of
text. Remember tha teach script object has a `direction` property that can be
`"ltr'` (left to right), `"rtl"` (right to left), or `"ttb"` (top to bottom).

The dominant direction is the direction of a majority of the characters that
have a script associated with them. The `characterScript` and `countBy` functions
defined earlier in the chapter are probably useful here.
 */

function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        return script;
      }
    }
    return null;
  }
  
  function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
      current = combine(current, element);
    }
    return current;
  }
  
  function map(array, transform) {
    let mapped = [];
    for (let element of array) {
      mapped.push(transform(element));
    }
    return mapped;
  }
  
  function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }

  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name == name);
      if (known == -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }

  function textScripts(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : "none";
    }).filter(({name}) => name != "none");
  
    let total = scripts.reduce((n, {count}) => n + count, 0);
    if (total == 0) return "No scripts found";
  
    return scripts.map(({name, count}) => {
      return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
  }
  



function dominantDirection(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
      }).filter(({name}) => name != "none");
    
    const max = scripts.reduce(function(prev, current) {
        return (prev && prev.count > current.count) ? prev : current
    });
    return max.name;
}
  
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
  