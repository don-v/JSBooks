# C11: ASYNCHRONOUS PROGRAMMING 

"Who can wait quietly while the mud settles?
Who can remain still until the moment of action?"
-- Laozi, *Tao Te Ching*

The central part of a computer, the part that carries out the individual steps that make up our programs, is called the *processor*. The programs we have seen so far will keep the processor busy until they have finished their work. The speed at which something like a loop that manipulates numbers can be execued depends pretty much entirely on the speed of the computer's processor and memory.

But many programs interact with things outside of the processor. For example, they may communicate over a computer netowrk or request data from the hard disk -- which is a lot slower than gettin git from memory.

When such a thing is happening, it would be a shame to let the processor sit idle -- there might be some other work it could do in the meantime. In part, this is handled by one's operating system, which will switch the processor between multiple running programs. But that doesn't help when we want a *single* program to be able to make progress while it is waiting for a network request.

## ASYNCHRONICITY

In a *synchronous* programming model, things happen one at a time. When one calls a function that performs a long-running action, it returns only when the action has finished and it can return the result. This stops one's program for the time the action takes.

An *asynchronous* model allows multiple things to happen at the same time. When one starts an action, one's program continues to run. When the action finished, the program is informed and gets access to the result (for example, the data read from disk).

We can compare synchronous and asynchronous programming using a small example: a program that makes two requests over the network and then combines the results.

In a synchronous environment, where the request function returns only after it has done its work, the easiest way to perform this task is to make the requests one after the other. This has the drawback that the second request will be started only when the first has finished. The total time take will be at least the sum of the two response times.

The solution to this problem, in a synchronous system, is to start additional threads of control. A thread is another running program whose execution may be interleaved with other programs by the operating system -- since most modern computers contain multiple processors, multiple threads may even run at the same time, on different processors. A second thread could start the second request, and then both threads wait for their results to come back, after which they resynchronize to combine their results. 

In the following diagram, the thick lines represent time the program spends running normally, and the thin lines represent time spent waiting for the network. In the synchronous model, the time take by the network is *part* of the timeline for a given thread of control. In the asynchronous model, starting a network action allows the program to continue running while the netowrk communication happens alonside it, notifying the program when it is finished. 

<!-- ![Straign-line Execution](../../../to_ignore/02_ProgramStructure/Straight_line_flow.png) -->


<!-- HERE! -->