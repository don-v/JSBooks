# CHAPTER 23: GraphQL AND React Native

In this chapter, we'll begin to fill our application by first exploring
how we can display content with 'React Native''s list views. We'll then
make use of Apollo Client (`https://www.apollographql.com/docs/react`)
to connect to our data API. Once we've connected, we'll write GraphQL
queries, which will display data on an app screen.

> **RUNNING OUR API LOCALLY**: The development of our mobile application
will require access to a local instance of our API. If one has been 
following along with the book, one may already have the 'Notedly' API
and its database up and running on one's machine. If not, teach has
added instructions in the book's Appendix A on how to get a copy of 
the API up and running along with some sample data. If one already has
the API running, but would like some additional data to work with, run
`npm run seed` from the root of the API project directory. 

## CREATING LIST AND SCROLLABLE CONTENT VIEWS

Lists are everywhere. In life, we keep to-do lists, grocery lists, and 
guest lists. In applications, lists are one of the most common UI patterns:
lists of social media posts, lists of articles...

<!-- HERE -- p. 256! -->