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




/* Going over the numbers is clearly a looping job, and selecting what to print is 
a matter of conditional execution. Remember the trick of using the remainder (%) 
operator for checking whether a number is divisible by another number (has a 
remainder of zero).

In the first version, there are three possible outcomes for every number, so you’ll 
have to create an if/else if/else chain.

The second version of the program has a straightforward solution and a clever one. The 
simple solution is to add another conditional “branch” to precisely test the given 
condition. For the clever solution, build up a string containing the word or words 
to output and print either this word or the number if there is no word, potentially 
by making good use of the || operator. */

for (let index = 1; index < 101; index++) {
    if (index % 3 === 0 && index % 5 === 0) {
        console.log(`${index}: FizzBuzz`); 
        continue;   
    }    
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