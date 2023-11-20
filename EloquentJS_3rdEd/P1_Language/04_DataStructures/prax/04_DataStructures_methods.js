let x = `
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH
`;

let doh = "Doh";
console.log('typeof doh.toUpperCase:',typeof doh.toUpperCase);
// → function
console.log('doh.toUpperCase():',doh.toUpperCase());
// → DOH