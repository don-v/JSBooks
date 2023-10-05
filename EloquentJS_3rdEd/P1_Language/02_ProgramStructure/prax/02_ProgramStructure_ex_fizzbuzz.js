/* Write a program that uses `console.log` to print all the numbers form 1 to 100,
with two exceptions. for numbers divisble by 3, print "Fizz" instead of the 
number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When one has that working, modify one's program to print "FizzBuzz" for numbers
that are divisible by both `3` and `5` (and still print "Fizz" or "Buzz" for 
numbers divisble by only of those)

(This is actually an interview question that has been claimed to weed out a 
significant percentage of programmer candidates. So if one is able to solve 
it, one can say that one's market value has increased!)
 */

for (let index = 1; index < 101; index++) {
    if (index % 3 === 0) {
        console.log(`${index}: Fizz`); 
        continue;   
    }
    if (index % 5 === 0) {
        console.log(`${index}: Buzz`); 
        continue;
    }
    console.log(index);
}