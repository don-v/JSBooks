const str1 = `Down on the sea`;
const str2 = "Lie on the ocean";
const str3 = 'Float on the ocean';

console.log('str1=', str1);
console.log('backtick str1 typeof:', typeof str1);

console.log('str2=', str2);
console.log('double quote str2 typeof:', typeof str2);

console.log('str3=', str3); 
console.log('single quote str3 typeof:', typeof str3);

const newline_str = "This is the first line\nAnd this is the second";
console.log('newline_str=', newline_str);
console.log('newline_str type:', typeof newline_str);

const escape_newline = "A newline character is written like \"\\n\".";
console.log('escape_new line:', escape_newline);
console.log('escape_newline typeof:', typeof escape_newline);

console.log('string concatenation: "con" + "cat" + "e" + "name":', "con" + "cat" + "e" + "name");

const template_lit = `half of 100 is ${100 / 2}`;
console.log('template literal: "`half of 100 is ${100 / 2}`"', template_lit);

// str1= Down on the sea
// backtick str1 typeof: string
// str2= Lie on the ocean
// double quote str2 typeof: string
// str3= Float on the ocean
// single quote str3 typeof: string
// newline_str= This is the first line
// And this is the second
// newline_str type: string
// escape_new line: A newline character is written like "\n".
// escape_newline typeof: string
// string concatenation: "con" + "cat" + "e" + "name": concatename
// template literal: "`half of 100 is ${100 / 2}`" half of 100 is 50