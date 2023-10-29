const ex = `
function power(base, exponent) {
    if (exponent == 0) {
      return 1;
    } else {
      return base * power(base, exponent - 1);
    }
  }
  
  console.log(power(2, 3));
  // → 8
`;

function power(base, exponent) {
    if (exponent == 0) {
      return 1;
    } else {
      return base * power(base, exponent - 1);
    }
  }
  
  console.log('power(2, 3):',power(2, 3));
  // → 8