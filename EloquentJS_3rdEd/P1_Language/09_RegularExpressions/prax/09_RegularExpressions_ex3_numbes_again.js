/* 
Write an expression that matches only JS-style numbers. It must supoprt an optional minus *or* plus sign in front 
of the number, the decimal dot, and exponent notation -- `5e-3` or `1E10`-- again with an optional sign in 
front of the exponent. Also note that it is not necessary for there to be digits in fron tof or after the dot, 
but the number cannot be a dot alone. That is, .5 and 5. are valid JS numbers, but a lone dot isn't.
*/

// Fill in this regular expression.
// let number = /^...$/;


// let number = /^\+?|^-?\d*\.?e?\+|-?\d*(?:\.\d)?/gi;
// let number=/\+?|-?\d*?\.?\d*?e?\+?|-?\d+?/gi;
// let number2=/[+-]?\d*?\.?\d*?e?[+-]?\d+?/gi;
let number=/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
// let gemini2=/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/gi;

// Tests:
for (let str of [
  "1"
  ,
  "-1"
  ,
  "+15"
  ,
  "1.55"
  ,
  ".5"
  ,
  "5."
  ,
  "1.3e2"
  ,
  "1E-4"
  ,
  "1e+12"
]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of [
  "1a"
  ,
  "+-1"
  ,
  "1.2.3"
  ,
  "1+1"
  ,
  "1e4.5"
  ,
  ".5."
  ,
  "1f5"
  ,
  "."
]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
    console.log(number.exec(str))
  }
}

/* 
A regular expression for matching positive or negative numbers, including those in scientific notation, is ^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$. This regex handles integers, decimals, and numbers with exponents (scientific notation), allowing for optional positive or negative signs. 
Here's a breakdown of the regex: 

    ^: Matches the beginning of the string.
    [+-]?: Matches an optional plus or minus sign.
    (\d+(\.\d*)?|\.\d+): Matches the numerical part.
        \d+: Matches one or more digits (integer part).
        \.: Matches a decimal point.
        \d*: Matches zero or more digits after the decimal point.
        |: Separates the two alternatives.
        \.\d+: Matches a decimal point followed by one or more digits (fractional part). 
    ([eE][+-]?\d+)?: Matches an optional exponent part.
        [eE]: Matches "e" or "E".
        [+-]?: Matches an optional plus or minus sign for the exponent.
        \d+: Matches one or more digits for the exponent value. 
    $: Matches the end of the string. 

This regex effectively captures various number formats, including: 

    Integers: 123, -123, +123
    Decimals: 123.45, -123.45, +123.45, .45, 123., -123., +.123
    Scientific Notation: 123e4, 123.45e-6, .123e+7, 123E4, 123.45E-6, .123E+7, -123e4, -123.45e-6, -.123e+7
*/