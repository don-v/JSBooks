/* 
Add support for arrays to Egg by adding the following 
three functions to the top scope: array(...values) to 
construct an array containing the argument values, 
length(array) to get an array’s length, and 
element(array, n) to fetch the nth element from an array.
*/


/* 
Strategy: 
pseudo code

take the values

first attempt failed:

```js
topScope.array = values =>
  return new Array(...values);

topScope.length = array =>
  return array.length;

topScope.element = (array, i) =>
  return array[i];


#############################

second failed attempt:

// Modify these definitions...

topScope.array = Function("values", `return new Array(...${values});`);

topScope.length = Function("array", `return ${array}.length;`);

topScope.element = Function("array", "element", `return ${array}[${element}];`);

#############################

third failed attempt

topScope.array = Function("...values", "return new Array(values);");

topScope.length = Function("array", "return array.length;");

topScope.element = Function("array", "element", "return array[element];");

#############################

fourth attempt success!

topScope.array = Function("...values", "return new Array(...values);");

topScope.length = Function("array", "return array.length;");

topScope.element = Function("array", "element", "return array[element];");

```

*/




require("../prax/12_Project_AProgrammingLanguage_ex/load")("../../egg_src/egg");

// Modify these definitions...

topScope.array = Function("...values", "return new Array(...values);");

topScope.length = Function("array", "return array.length;");

topScope.element = Function("array", "element", "return array[element];");


run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6