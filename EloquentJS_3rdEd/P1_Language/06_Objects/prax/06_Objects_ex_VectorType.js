/* 
Write a class `Vec` that represents a vector in two-dimensional space. It takes
`x` and `y` parameters (numbers), that it saves to properties of the same name.

Give the `Vec` prorotype two methods, `plus` and `minus`, that takes another 
vector as a parameter and returns a new vector that has the sum or difference of
the two vectors' (this and the parameter) _x_ and _y_ values.

Add a getter property `length` to the prototype that computes the length of the
vector -- that is, the distance  of the point _(x,y)_ form the origin (0,0).
*/

// Your code here.

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(vec) {
        return new Vec(this.x+vec.x,this.y,vec.y);
    }
    minus(vec) {
        return new Vec(this.x-vec.x,this.y-vec.y);
    }
    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
