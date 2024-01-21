/* 
The `==` operator compares objects by identity. But sometimes, one'd prefer to
compare the values of their actual properties.

Write a function `deepEqual` that takes two values and returns true only if they
are the same value or are object with the same properties, where the values of 
the properties are equal when compared with a recursive call to `deepEqual`

To find out whether values should be compared direclty (use the `===` operator
for that) or have thier properties compared, one can use the `typeof` operator.

If it produces `"object"`, for both values, one should do a deep comparison. But
one has to take one silly exception into account: because of a historical accident, 
`typeof null` also produces `"object"`.

The `Object.keys` function will be useful when one needs to go over the properties
of object to compare them.
*/


// Your code here.

function deepEqual(o1, o2) {
    let x = typeof o1;
    console.log('typeof o1: ',x);
    console.log('typeof x', typeof x);
    console.log('typeof o2: ',typeof o2);

    if (typeof o1 !== typeof o2 ) {
        return false
    } else if (typeof o1 !== "object") {
        return o1 === o2
    } else {
        
    }

}



let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

