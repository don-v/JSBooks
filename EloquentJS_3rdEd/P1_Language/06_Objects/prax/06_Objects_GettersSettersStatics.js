let x=`let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    }
  };
  
  console.log(varyingSize.size);
  // → 73
  console.log(varyingSize.size);
  // → 49`;

  console.log('*'.repeat(80).concat('\n'));
  console.log(x);
  

  let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    }
  };
  
  console.log(varyingSize.size);
  // → 73
  console.log(varyingSize.size);
  // → 49