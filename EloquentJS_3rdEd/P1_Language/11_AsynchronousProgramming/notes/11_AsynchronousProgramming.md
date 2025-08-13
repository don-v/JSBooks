# C11: ASYNCHRONOUS PROGRAMMING 

"Who can wait quietly while the mud settles?
Who can remain still until the moment of action?"
-- Laozi, *Tao Te Ching*

The central part of a computer, the part that carries out the individual steps that make up our programs, is called the *processor*. The programs we have seen so far will keep the processor busy until they have finished their work. The speed at which something like a loop that manipulates numbers can be execued depends pretty much entirely on the speed of the computer's processor and memory.

But many programs interact with things outside of the processor. For example, they may communicate over a computer netowrk or request data from the hard disk -- which is a lot slower than gettin git from memory.

When such a thing is happening, it would be a shame to let the processor sit idle -- there might be some other work it could do in the meantime. In part, this is handled by one's operating system, which will switch the processor between multiple running programs. But that doesn't help when we want a *single* program to be able to make progress while it is waiting for a network request.

## ASYNCHRONICITY

In a *synchronous* programming model, things happen one at a time. When one calls a function that performs a long-running action, it returns only when the action has finished and it can return the result. This stops one's program for the time the action takes.

An *asynchronous* model allows multiple things to happen at the same time. When one starts an action, one's program continues to run. 

<!-- HERE! -->