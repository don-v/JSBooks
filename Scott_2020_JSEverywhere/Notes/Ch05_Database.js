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


*/