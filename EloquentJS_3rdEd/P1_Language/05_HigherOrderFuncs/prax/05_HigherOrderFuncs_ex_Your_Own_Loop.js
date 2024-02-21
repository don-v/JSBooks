/* 
Write a higher-order function `loop` that provides something like a 
`for` loop statement. It takes a value, a test function, an update
function, and a body function. Each iteration, it first runs the 
test funciton on the current loop value and stops if that returns
false. Then, it calls the body function, giving it the current value.
Finally, it calls the upate function to creat a new value and starts 
from the beginning.

When defining the function, one can use a regular loop to do the 
actual looping:

*/

// Your code here.
function loop(value, test_func, update_func, body_func) {
    while (test_func(value)) {
        body_func(value);
        value = update_func(value);
    }
}


loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1