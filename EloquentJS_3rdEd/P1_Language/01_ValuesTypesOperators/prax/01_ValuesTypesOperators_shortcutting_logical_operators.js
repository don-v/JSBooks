// `||` operator
console.log('null || "user":',null || "user")
// → user
console.log('"Agnes" || "user"',"Agnes" || "user")
// → Agnes
console.log('0 || -1:',0 || -1);
console.log('"" || "!?":',"" || "!?");

// lazy evaluation
console.log('true || X:',true || X);
console.log('false && X:',false && X);

/* 
null || "user": user
"Agnes" || "user" Agnes
0 || -1: -1
"" || "!?": !?
true || X: true
false && X: false
*/