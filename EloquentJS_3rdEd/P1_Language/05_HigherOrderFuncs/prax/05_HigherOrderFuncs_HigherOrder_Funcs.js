let x = `function greaterThan(n) {
    return m => m > n;
  }
  let greaterThan10 = greaterThan(10);
  console.log(greaterThan10(11));
  // → true`;

  console.log(x);

  function greaterThan(n) {
    return m => m > n;
  }
  let greaterThan10 = greaterThan(10);
  console.log(greaterThan10(11));
  // → true