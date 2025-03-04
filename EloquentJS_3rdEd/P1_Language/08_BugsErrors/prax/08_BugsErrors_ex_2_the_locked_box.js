// Consider the following (rather contrived) object: 


const box_ = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};


/* It is a box with a lock. There is an array in the box, but one can 
get at it only when the box is unlocked. 

Write a function called `withBoxUnlocked` that takes a function value 
as argument, unlocks the box, runs the funciton, and then ensures that 
the box is unlocked again before returning, regardless of whether the 
argument function returned normally or threw an exception.  
 */

const box = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body) {
  // Your code here.
  try {
    let currentBoxLockState = box.locked;
    if (currentBoxLockState) {
      box.unlock();
    }
    body();
  } catch (error) {
    
  } finally {

  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true


/* For extra points, make sure that it if one calls `withBoxUnlocked` when the box 
is already unlocked, the box stays unlocked.  */