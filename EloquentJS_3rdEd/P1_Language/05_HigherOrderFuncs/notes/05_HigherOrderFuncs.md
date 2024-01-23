# C5: HIGHER-ORDER FUNCTIONS

"Tzu-li and Tzu-ssu were boasting about the size of their programs. 'Two-
hundred thousand lines,' said Tzu-li, 'not counting comments!' Tzu-ssu
responded, 'Pssh, mine is almost a _million_ lines already.' Master Yuan-Ma
said, 'My best program has five hundred lines.' Hearing this, Tzu-li and 
Tzu-ssu were enlighetened."

-- Master Yuan-Ma, _The Book of Programming_

"There are two ways to constructing a software design: One way is to make it
so simple that there are obviously no deficiencies, and the other way is to 
make it so complicated that there are not obvious deficiencies."

--C.A.R Hoare, _1980 ACM Turing Award Lecture_

A large program is a costly program, and not just because of the time it takes to 
build. Size almost always invovles complexity, and complexity confuses programmers.
Confused programmers, in turn, introduce mistakes (_bugs_) into programs. A large
program then provides a lot of space for these bugs to hide, making them hard to find.

Let's briefly go back to the final two example programs in the introduction, The
first is self-contained and six lines long.:

```js
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```

The second relies on two external functions and is one line long.:

```js
console.log(sum(range(1, 10)));
```

Which one is more likely to contain a bug?

<!-- HERE -- intro! -->