/* 

* Zero is even

* One is odd

* For any other number _N_, its evenness is the same as N-2.


Define a recursive function `isEven` corresponding to this description. The 
function should accept a single parameter (a positive whole number) and 
return a Boolean.

Test it on 50 and 75. See how it behaves on `-1`. Why? Can one think of a way 
to fix this?
*/

function absVal(x) {
    if (x >= 0) return x;
    return -x;
}

function isEven(x) {
    if (absVal(x) === 0) {
        return true;
    }
    if (absVal(x) === 1) {
        return false;
    }
    return isEven(x-2);
}

console.log('50 is even:', isEven(50));
console.log('75 is even:', isEven(75));
console.log('-1 is even:', isEven(-1));