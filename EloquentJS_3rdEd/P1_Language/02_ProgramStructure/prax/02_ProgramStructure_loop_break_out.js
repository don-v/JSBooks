let x = `for (let current = 20; ; current = current + 1) {
    if (current % 7 == 0) {
      console.log(current);
      break;
    }
  }
  // → 21`;

console.log(x);

for (let current = 20; ; current = current + 1) {
    
    if (current % 7 == 0) {
        console.log(current);
        break;
    }
}
// → 21