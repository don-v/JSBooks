/* 

// DATABASE

At its core, a database allows one to store information and 
retrieve it later!

Teach has used SQL, but in this book, will use MongoDB:

https://www.mongodb.com

since it is a popular choice in the Node.js ecosystem. MongoDB
stores data in 'documents' which are organized very much like 
JS objects! Meaning, a JS dev will be able to read and write to
MongoDB with relative ease because of MongoDB's use of JS=like 
objects!

Teach says thought, that one can use another DB if preferred,
like 'PostgresSQL' since the concepts covered in this book
are transferable to any system with a little work!

Before we can work with Mongo, however, we will need to
snesure that the MongoDB server is running locally. This
is something that is required throughout developement. To
do so, one will need to check for instructions in Ch. 1!

```

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kj1905:<password>@notes-graphql.6z3u3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

```

```
mongodb+srv://kj1905:<password>@notes-graphql.6z3u3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

"""
Replace <password> with the password for the kj1905 user. 
Replace myFirstDatabase with the name of the database that 
connections will use by default. Ensure any option params 
are URL encoded.
"""

// GETTING STARTED WITH MONGODB

teach uses a the 'mongo' executable in the shell, but i'll just follow along
since I don't want to install more software on my machine!

the first command is:

```
$ mongo
```

which should return informatio about our MongoDB shell, the local
server connection, and some additional information printed
to the terminal.

We can now interact directly with MongoDB from within the terminal
application.  We can create a database as well as switch to a new
database with the `use` command as follows. we can use the `use`
command to create and switch to a database named `learning`

```
$ use learning
```

MongoDB organizes information into `collection` units, which
are used to group together similar `document` objects! For example,
a blog application might have a colleciton for posts, another for users,
and a third for comments.  If we compare a `collection` to a JS object,
it would be the top-level object; while documens are the individual 
objects contained within. Loosely, it seems that collections are like SQL
tables, and the documents are the indivdiual table records. 
It can be visualized as follows :

```
collection: {
  document: {},
  document: {},
  document: {},
  ...
}
```

For me, I have a cluster, which houses a database, which then
can contain collections, and then documents.

With this information in hand, let's create a document within
a collection in our `learning` database.  We'll create a 
`pizza` collection in which we will store documents with
pizza type.  

*/