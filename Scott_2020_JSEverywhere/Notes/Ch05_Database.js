/* 

05/06/2022: trying to extract the filecontents of async fs.readFile method!

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
pizza type. Enter the following into the MongoDB shell:

```
$ db.pizza.save({ type: "Cheese" })
```

If this is successful, we should see a returned result that reads:

```
WriteResult({ "nInserted": 1 })
```

We can also write multiple entries into the database at once:

```
$ db.pizza.save([{type: "Veggie"}, {type: "Olive"}])
```

Nowe that we've written some documents to our database, we can
retrieve them!  To do so, we use the MongoDB `find` method. To
see all of the documents in the collection, run a `find` command,
with empty parameters:

```
$ db.pizza.find()
```

We should now see all three entries in the database.  In addition
to storing the data, MongoDB automatically assigns a unique ID to
each entry.  The results should look something like this:

```
{ "_id": ObjectId("5c7528b223ab40938c7dc536"), "type" : "Cheese"}
{ "_id": ObjectId("5c7f59fa23ab40938c7dc53e"), "type" : "Veggie"}
{ "_id": ObjectId("5c7529fa23ab40938c7dc53f"), "type" : "Olive"}
```

We can also find individual documents, both by property values as well as 
with Mongo's assigned ID:

```
$ db.pizza.find({  type: "Cheese" })
$ db.pizza.find( { _id: ObjectId("<document id here>")})
```

Not only do we want to be able to find documents, but it's also useful
to be able to update them.  We can do so by using mongo's `update`
method, which accepts a first parameter of a document to change and a 
second parameter of the chagne to the document.  Let's update our
'Veggie' pizza to be a 'Mushroom' pizza:

```
$ db.pizza.update({ type: "Veggie" }, { type: "Mushroom" })
```

Now, if we run `db.pizza.find()`, we shoudl see that our document
has been updated:


```
{ "_id": ObjectId("5c7528b223ab40938c7dc536"), "type" : "Cheese"}
{ "_id": ObjectId("5c7f59fa23ab40938c7dc53e"), "type" : "Mushroom"}
{ "_id": ObjectId("5c7529fa23ab40938c7dc53f"), "type" : "Olive"}
```

As with updating a document, we can also remove one using Mongo's `remove`
method.  Let's remove the mushroom pizza from our database:

```
db.pizza.remove({ type: "Mushroom" })
```

Now if we perform a `db.pizza.find` query, we will see only 2 documents 
in our collection!.  If we decided that we no longer wanted to include any 
data, we pass an empty object literal to the `remove` method, which will
wipe the entire collection:

```
$ db.pizza.remove({})
``

We've not successfully used the MongoDB shell to create a database, 
add documents to a collection, update those documents, and remove
them.  These fundamental database operations will provide a solid
footing as we integrate a database into our project.  

In developement, we can also access our database using the MongoDB
shell.  this can prove helpful for tasks such as debugging and 
manually removing and updating entries. 

// CONNECTING MONGODB TO OUR APPLICATION

To connect our app to mongodb, we will use teh 'Mongoose
Object Document Mapper (ODM) (https://mongoosejs.com). Mongoose
is a library that simplifies working with MongoDB in a Node.js
application by reducing and streamlining boilerplate code, through
the use of its schema-based modeling solution. 

We will first need to update our '.env' file with the URL of our
local database.  This will allow us to set the database URL in
whatever environment we are working (such as local dev or produciton).
The default URL of a local MongoDB server is:

```
mongodb://localhost:27017
```

to which we'll add the name of our database.  So, wihtin our 
'.env' file, we will st a `DB_HOST` variable with the URL of 
our Mongo database instance as follows:

```
DB_HOST=mongo://localhost:27017/notedly
```
The next step in working with a database in our application is to connect
to it! we will put our connection code in a new file located in our
/src/ directory! named 'db.js', so the filepath from our project root
will be '/src/db.js' 

We will write our database connection code in this new 'db.js' file!

We will also include a function to close our database connection, 
will prove useful for testing our application!

so in our '/scr/db.js' file, we add the following source:

```
// Require the mongose library
const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    // Use the Mongo driver's updated URL string parser
    mongoose.set('useNewUrlParser', true);
    // Use `findOneAndUpdate()` in place of findAndModify()
    mongoose.set('useFindAndModify', false);
    // Use `createIndex()` in place of `ensureIndex()`
    mongoose.set('useCreateIndex', true);
    // Use the new server discovery & monitoring engine
    mongoose.set('useUnifiedTopology', true);
    // Connect to the DB
    mongoose.connect(DB_HOST);
    // Log an error if we fail to connect
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};

```

now we have to update our '/src/index.js' file so it uses 
the `connection` property passed through by the module.exports.

to do so, we must first import our '.env' configuration as well
as the '/src/db.js' file.  So at the top of our '/src/index.js' 
file, we add these imports:

```
require('dotenv').config();
const db = require('./db');
```

Teach likes to store the `DB_HOST` value that id defined 
in the our '.env' file as a variable.  Add this variable
directly below the port variable definition:s

```
const DB_HOST = process.env.DB_HOST;
```

we can then add our db connection:

```
db.connect(DB_HOST);
```

Though the actual ufnctionality has not changed, if one
ran `npm run dev`, the application should successfully connect
to the database and run without errors.

// READING AND WRITING DATA FROM OUR APPLICATION

Now that we can connect to our database, let's write the code 
needed to read and write data to it from within the application. 

Mongoose allows us to define how the data will be stored in 
our database as a JavaScript object ,and we can then store
and act upon data that fits that model structure.  With this in
mind, let's create our ojbect, referred to as Mongoose schema.

First, we create a folder within our 'src' dir called 'models'
to house this schema file.  In the filder, creat a file 
named 'note.js', so it's bath will be :'/src/models/notes.js'.

in our '/src/models/notes.js' file, we begin by defining the 
basic set up of the file:

```
// Require the mongoose library
const mongoose = require('mongoose');

// Define the notes' database schema
const noteSchema = new mongoose.Schema();

// Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);

// export them module:
module.exports = Note;
```

Next, we will define our schema, and store it in the 
`noteSchema` variable. Similar to our in-memory data
example, our current schema will, for now, include the
content of the note as well as a hardcoded string 
representing the author.   We'll also include the option
to inlcude timestamps for our notes, which will be 
automatically stored whe na note is created or
edited.  We'll be adding functionality to our note
schema as we go.

Our Mongoose schema will be structured as follows:

```
// Define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    // Assigns `createdAt` and `updatedAt` properties with a `Date` type:
    timestamps: true
  }
);
```

To simplify imorting our models int oour Apollo Server Express
applications, we'll add an 'index.js' file to the '/src/models'
directory.  This will combine our models into a single JavaScript
module.  While this isn't strictly necessary, I find it to be a 
good pattern to follow as applications and database models grow.

In '/src/models/index.js', we'll import our note model


*/