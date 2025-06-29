# CHAPTER 10: MODULES

"Write code that is easy to delete, not easy to extend." -- Tef, *programming is terrible*

Ideally, a program has a clear, straightforward structure. The way it works is easy to explain, and each part plays a well-defined role.

In prax, programs grow organically. Pieces of functionality are added as the programmer identifies new needs. Keeping such a program well structured requires constant attention and work. This is work that will pay off only in the future, the *next* time someone works on the program, so it's tempting to neglect it an dallow various parts of the program to become deeply entanbled.

This causes two practical issues. First, understanidng an entangled syetm is hard. If everything can touch everything else, it is diffiuclt to look at any given piece in isolation. One is forced to build up a holistic understanding of the entire thing. Second, if one wants to use any of the functionality from such a program in another situation, rewriting it amy be easier than trying to disentangle it from its context. 

The phrase "big ball of mud" is often used for such large, structureless programs, Everything sticks together, and when one tries to pick out a piece, the whole thing comes apart, and one succeeds ony in making a mess. 

## MODULAR PROGRAMS

*Modules* are an attempt to avoid these problems. A module is a piece of program that specifies which other pieces it relies on and which functionality it provides for other modules to use (its *interface*).

Module interfaces ...

<!-- HERE -- p. modular programs! -->