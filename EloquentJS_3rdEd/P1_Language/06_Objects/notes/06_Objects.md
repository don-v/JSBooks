# C6: THE SECRET LIFE OF OBJECTS

"An abstract data type is realized by writing a special kind of program
[...] which defines the type in terms of the operations which can be
performed on it."

--Barbar Liskov, _Programming with Abstract Data Types

C4 introduced JS objects. In programming culture, one has a think called _OOP_, a 
set of techniques that use objects (and related concepts) as the central 
principle of program organization.

Though no one really agrees on its precise definition, OOP has shaped the design
of many programming languages, including JS. This chapter will describe the
way these ideas can be applied in JS.

## ENCAPSULATION

The core idea in OOP is to divie programs into smaller pieces and make each 
piece responsible for managing its own state.

This way, some knowledge about the way a piece of the program works can be
kept _local_ to that piece. Someone wokring on the rest of the program does
not have to remember or even be aware of that knowledge. Whenever these local
details change, only the code directly around it needs to be updated.

Different pieces of such a program interact with each other through interfaces,
limited sets of functions or bindings that provide useful functionality at 
a more abstrac level, hiding thier precise implementaiton.

Such program pieces are modeled using objects. Their interface consists of a 
specific set of methods and properties. Properties that are part of the 
interface are called _public_. The others, which ...

<!-- HERE -- ENCAPSULATION! -->