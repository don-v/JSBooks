let x = `
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH
`;

console.log(x);

let doh = "Doh";
console.log('typeof doh.toUpperCase:',typeof doh.toUpperCase);
// → function
console.log('doh.toUpperCase():',doh.toUpperCase());
// → DOH

x = `
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
`;

console.log(x);

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log('sequence:',sequence);
// → [1, 2, 3, 4, 5]
console.log('sequence.pop():',sequence.pop());
// → 5
console.log('sequence:',sequence);
// → [1, 2, 3, 4]
