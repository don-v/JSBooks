/*
// CRUD OPERATIONS

CRUD refers to apps that create, read, update, and delete data.

CRUD plays a role in many modern applications:

* to-do lists
* spreadsheets
* content management systems
* text editors
* socail medai websites

Generally, with respect to data, a user may
create, access/read, update, or delete it.

The 'Notedly' application that teach is demonstrating
how to build follows the 'CRUD' pattern. Users will
be able to create, read, update, and delete their 
own notes!

In this chapter, we will implement the essential
CRUD functionality of our API by connecting our 
resolvers and database!

// SEPARATING OUR GRAPHQL SCHEMA AND RESOLVERS

currently, our '/src/index.js' file is home to our 
Express/Apollo Server code as well as to our API's 
schema and resolver! As one can imagein, this could
get unwieldly as our codebase grows.  Before this
happens, let's take some time to do a minor refarctor
that separates our schema, resolvers, and server code.

To begin, let's movero our GraphQL schema to its own
file! First, we'll make a new file named in our 'src'
directory so that its path will be '/src/schema.js'

To move our schema content, which is bound to our
`typeDefs` variable, we will need to import the `gql`
schema languge that comes with the `apollo-server-express`
package and export our schema as a module using Node's
`module.exports` attribute.  While we're at it, we can
also remove the `hello` query, which we won't need in our
final application. 



*/
