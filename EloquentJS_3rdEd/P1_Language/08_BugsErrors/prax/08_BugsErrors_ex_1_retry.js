/* 
Say one has a function `primitiveMultiply` that in 20 percent of cases multiplies two 
numbers and in the other 80 percent of cases raises an exception of type 
`MultiplicatorUnitFailure`. Write a function that wraps this clunky function and just keeps 
trying until a call succeeds, after which it returns the result. 

One should be sure to handle only the exceptions one is trying to handle:
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
  let result;
  for (;;) {
    try {
      result = primitiveMultiply(a,b);
      console.log("The result is: ", result);
      break;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        // console.log("Still processing...");
        continue;
      } else {
        throw e;
      }
    }
  }
  return result;
}

console.log(reliableMultiply(8, 8));
// → 64





