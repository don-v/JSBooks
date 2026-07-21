/* As we saw, given an array of promises, `promise.all` returns a promise that waits for all 
of the promises in the array to finish. It then succeeds, yielding an array of result values. 
If a promise in the array fails, the promise returned by `all` fails too, passing on the failure 
reason from the failing promise.

Implement something like this yourself as a regular function called `Promise_all`. 

Remember that after a promise has succeeded or failed, it can't succeed or fail again, and 
further calls to the functions that resolve it are ignored. This can simplify the way one 
handles a failure of one's promise.
 */

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    
    if (promises) {
      // Arrays to capture the outcomes
      const resolvedOutcomes = [];
      const rejectedOutcomes = [];

      // Using a plain loop to process each promise
      for (let i = 0; i < promises.length; i++) {
        const currentPromise = promises[i];

        currentPromise
          .then((value) => {
            // This runs if the promise resolves
            resolvedOutcomes.push({ index: i, status: 'resolved', data: value });
          })
          .catch((error) => {
            // This runs if the promise rejects
            rejectedOutcomes.push({ index: i, status: 'rejected', error: error });
          });
      }

      if (resolvedOutcomes.length == promises.length) {
        resolve(promises);
      }
      reject(promises);
    }
    resolve(promises);
    
  });
    
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});

// Promise.all([soon(1), soon(2), soon(3)]).then(array => {
//   console.log("This should be [1, 2, 3]:", array);
// });




// Promise_all([soon(1), Promise.reject("X"), soon(3)])
//   .then(array => {
//     console.log("We should not get here");
//   })
//   .catch(error => {
//     if (error != "X") {
//       console.log("Unexpected failure:", error);
//     }
//   });