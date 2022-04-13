// Problem: You want ot merge two or more strings into one

// Solution: concatenate the strings using the (+) operator:

var string1 = "This is a ";
var string2 = "test";

var string3 = string1 + string2;
console.log(`string1: ${string1} + string2: ${string2} = string3: ${string3}`);


// Discussion

// The addition operator (+) is typically used to add numbers together:

var newValue = 1 + 3; 
console.log(`newvalue (1 + 3): ${newValue}`);

// in JS, (+) is overloaded, meaning it can be used for multiple data types, including strings. 
// When used with strings, the results are concatenated. 

// One can add 2 strings or multiple strings:

// 2 strings:

var twoStringConcatenation = string1 + string2;
console.log(`string1: ${string1}`);
console.log(`string2: ${string2}`);
console.log(`twoStringConcatenation(string1 + string2): ${twoStringConcatenation}`);

// multi-string concatenation

var stringA = "This";
var stringB = "is";
var stringC = "a";
var stringD = "test";

var multipleStringConcatenation = stringA + " " + stringB + " " + stringC + " " + stringD;

console.log(`stringA: ${stringA}`);
console.log(`stringB: ${stringB}`);
console.log(`stringC: ${stringC}`);
console.log(`stringD: ${stringD}`);
console.log(`multipleStringConcatenation (stringA + " " + stringB + " " + stringC + " " + stringD): ${multipleStringConcatenation}`);

// shortcut for string concatenation, and that's the JavaScript shorthand assignment operator (+=). 

var oldValue = "apples";
console.log(`oldValue: ${oldValue}`);
oldValue += " and oranges"; // 
console.log(`oldValue += ' and oranges': ${oldValue}`);

// is equivalent to:

var oldValue = "apples";
console.log(`oldValue: ${oldValue}`);
oldValue = oldValue + " and oranges";
console.log(`oldValue = oldValue + ' and oranges': ${oldValue}`);

// The shorthand assignment operator works with stirngs by concatenating the string on the right side
// of the operator to the end of the string on the left. 

// The is a built-in String method that can concatenate multiple strings: `concat` : It takes one ore more string
// parameters as arguments, each of which are appended to the end of the string object:

var nwString = "".concat('This ', 'is ', 'a ', 'string', '.')
console.log(`nwString = "".concat('This ', 'is ', 'a ', 'string', '.'): ${nwString}`)

// concat method can be a simpler way to generate a string from multiple values, such as generating a string from several
// form fields
