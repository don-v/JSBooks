const ex = `function wrapValue(n) {
    let local = n;
    return () => local;
  }
  
  let wrap1 = wrapValue(1);
  let wrap2 = wrapValue(2);
  console.log(wrap1());
  // → 1
  console.log(wrap2());
  // → 2`;

console.log(ex);

  function wrapValue(n) {
    let local = n;
    return () => local;
  }
  
  let wrap1 = wrapValue(1);
  let wrap2 = wrapValue(2);
  console.log('console.log(wrap1());',wrap1());
  // → 1
  console.log('console.log(wrap2());',wrap2());
  // → 2

  const ex2 = `function multiplier(factor) {
    return number => number * factor;
  }
  
  let twice = multiplier(2);
  console.log(twice(5));
  // → 10`;

  console.log(ex2);

  function multiplier(factor) {
    return number => number * factor;
  }
  
  let twice = multiplier(2);
  console.log('console.log(twice(5));',twice(5));
  // → 10

  