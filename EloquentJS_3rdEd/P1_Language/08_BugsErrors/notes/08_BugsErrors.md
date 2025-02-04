# C8: BUGS AND ERRORS

>>> "Debugging is twice as hard as writing the code in the first place. Therefore if you write the 
code as cleverly as possible, you are, by definition, not smart enough to debug it."

--Biran Kernighan and P.J. Plauger, *The Elements of Programming Style*

Flaws in computer programs are usually called *bugs*. It makes programmers feel good to imagine 
them as little things that just happen to crawl into our work. In reality, of course, we put them 
there ourselves. 

If a program is crystallized thought, we can roughtly categorize bugs into those caused by the 
thouhts being confused and those caused by mistakes introduced while converting a thought to code. 
The former type is generally harder to diagnose and fix than the latter. 

## LANGAUGE

Many mistakes could be potined out to us automatically by the computer if it knew enought about what 
we're trying to do. But here, JS' looseness is a hindrance. Its concept of bindings and properties is 
vague enough that it will rarely catch typos before actually running the program. Even then, it allows 
one to do some clearly nonsensical things without complaint, such as computing `true * "monkey"`.

There are some ...

<!-- HERE -- language... -->