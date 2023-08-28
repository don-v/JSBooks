// LOGICAL AND (`&&`)
console.log('true && false:',true && false)
// → false
console.log('true && true:',true && true)
// → true

// LOGICAL OR (`||`)
console.log('false || true:',false || true)
// → true
console.log('false || false:',false || false)
// → false

// MIX AND MATCH:
console.log('1 + 1 == 2 && 10 * 10 > 50:',1 + 1 == 2 && 10 * 10 > 50);

// TERNARY
console.log('"true ? 1 : 2" resolves to:',true ? 1 : 2);
// → 1
console.log('"false ? 1 : 2" resolves to:',false ? 1 : 2);
// → 2

/* 
true && false: false
true && true: true
false || true: true
false || false: false
1 + 1 == 2 && 10 * 10 > 50: true
"true ? 1 : 2" resolves to: 1
"false ? 1 : 2" resolves to: 2
*/