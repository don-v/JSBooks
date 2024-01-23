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
    let objOneType = typeof o1;
    let objTwoType = typeof o2;
    // 0. check equality if neither is an object, but they are still the same type
    if (objOneType !== 'object' && objTwoType !== 'object' && objOneType === objTwoType) return o1 === o2;
    // 1. if they are different types, we can return false, they can't be equal!
    if (objOneType !== objTwoType) return false;
    // 2. if they are both objects, and not null, then we have to check
    if ((o1 !== null && objOneType === 'object') && (o2 !== null && objTwoType === 'object')) {
    // to see if each each have the same properties, if they don't then
    // we return false. -- 
        let objOneProps = Object.keys(o1);
        let objTwoProps = Object.keys(o2);
    // a. first we can check the length of the array of
    // properties to see that they are the same. 
        if (objOneProps.length !== objTwoProps.length) return false;
    // b. then we have to check the order.
        for (let index = 0; index < objOneProps.length; index++) {
            if (objOneProps[index] !== objTwoProps[index]) return false;
            else {
                // c. then we have to compare the values associated with 
                // each property
                return deepEqual(o1[objOneProps[index]],o2[objTwoProps[index]])
            }
        }
    }
}



let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

