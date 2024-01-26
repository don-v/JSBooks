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

If we count the size of definitions of `sum` and `range`, the second program is
also big -- even bigger than the first. But still, teach'd argue that it's more
likely to be correct.

It is more likely to be correct because the solution because the solution is
expressed in a vocabulary that corresponds to the problem being solved. Summing
a range of numbers isn't about loops and counters. It is about ranges and sums.

The definitions of this vocubulary (the functions `sum` and `range`) will still
involve loops, counters, and other indicdental details. But because they are
expressing simpler concepts than the program as a whole, they are easier to
get right.

## ABSTRACTION

In the context of programming, these kinds of vocabularies are usually called
_abstractions_. Abstractions hide details and give us the ability to talk about
problems at a higher (or more abstract) level.

As an analogy, compare these two recipes for pea soup. The first goes like this:

  "Put 1 cup of dried peas per person into a container. Add water until the peas
  are well covered. Leave the peas in water for at least 12 hours. Take the peas
  out of the water and put them in a cooking pan. Add 4 cups of water per person.
  Cover the pan and keep the peas simmering for two hours. Take half an onion per
  person. Cut it into pieces with a knife. Add it to the peas. Take a stalk of
  celery per person. Cut it into pieces with a knife. Add it to the peas. Take a
  carrot per person. Cut it into pieces. With a knife! Add it to the peas. Cook
  for 10 more minutes."

And this second recipe:

  "Per person: 1 cup dried split peas, half a chopped onion, a stalk of celery, and 
  a carrot.

  Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water (per perosn). Chop
  and add vegetables. cook for 10 more minutes."

The second is shorter and easier to interpret. But one does need to undersand a
few more cooking-related words such as _soak_, _simmer_, _chop_, and, teach guesses,
_vegetable_.

When programming, one can't rely on all the words we need to be waiting for us
in the dictionary. Thus, we might fall into the pattern of the first recipe -- 
work out the precise steps the computer has to perform, one by one, blind to 
the higher-level concepts that they express.

It is a useful skill, in programming, to notice when one is working at too low a
level of abstraction.

## ABSTRACTING REPETITION

Plain functions, 
  

<!-- HERE -- ABSTRACTIING REPETITION! -->