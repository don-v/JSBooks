/*
// CH09: DETAILS

So far, we have a working API, but it's lacking the finishing 
touches that will allows us to put it into production. In this
chapter we'll implement some web and GraphQL application security
and user experience best practices. These details will be critical to 
safety, security, and usability of our application.

// WEB APPLICATION AND EXPRESS.JS BEST PRAX...

Express.js is the underlying web application framework that 
powers our API. We can make a few small tweaks to our Express.js
code to provide a solid basis for our application.

// EXPRESS HELMET

The 'Express Helmet' middleware...:
https://github.com/helmetjs/helmet

... is a collection of small security-minded middleware functions.
These will adjust our application's HTTP headers to be more secure.
While many of these are specific to browser-based applications, 
enabling Helmet is a simple step to protect our application from 
common web vulnerabilities. 

To enable 'Helmet', we'll require the middleware in our application 
and instruct Express ot use it early in our middleware stack. In the 
'/src/index.js' file, add the following:

```
// first require the package at the top of the file
const helmet = require('helmet')

// add the middleware at the top of the stack, after `const app = express()`
app.use(helmet());
```

By adding the 'Helmet' middleware, we're quickly enabling common
web security best practices for our application.

// CROSS-ORIGIN RESOURCE SHARING

Cross-Origin Resource Sharing (CORS) is the means by which we allow
resources to be requested from another domain.  Because our API and
UI code will live separately, we'll want to enable credentials from
other origins. If you're interested in learing the ins and outs of 
'CORS', teach highly recommends the 'Mozilla CORS guide'...:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

... To enable CORS, we'll use the Express.js CORS middleware...:
https://expressjs.com/en/resources/middleware/cors.html

... we'll use the Express.js middleweare and add it ot our
'/src/index.js';

```
// first require teh package at the top of the file
const cors = require('cors');

// add the middleware after app.use(helmet());
app.use(cors());
```

By adding the middleware in this way, we are enabling cross-origin
requests from _all_ domains. This works well for us for now, as we're
in development mode and will likely be using domains generated by our 
hosting providers, but y using the middleware, we could also limit 
the requests to those of specific origins!s

// PAGINATION

Currently, our `notes` and `user` queries return the full list
of notes and users in the database. This works fine for local
development, but as our application grows it will become 
unsustainaable, as a query that returns potentially hundreds 
(or thousands) of notes is expensive and will slow down our 
database, server, and netowrk. Instead, we can paginate those 
queries, returning only a set number of results.

There are 2 common types of pagination that we could implement:

1. OFFSET PAGINATION:
The first type, _offset pagination__, works by the client passing
an offset number and returning a limited amount of data. For 
example, if each page of data were limited to 10 records, and we
wanted to request the thired page of data, we could pass an 
offset of 20. While this is the most straightforward approach,
conceptually, it can run into scaling and performing issues. 

2. CURSOR-BASED PAGINATION:

The second type, _cursor-based pagination_, in which a time-based
cursor or unique identifier is passed a a starting point. We then
request a specific amount of data that follows this record. This
approach gives us the greatest control over our pagination. 
Additionally, because Mongo's object IDs are ordered (they begin with
4-byte time value), we can easily utilize them as our cursor. To
learn more about Mongo's object ID, reach recommends reading the 
corresponding MongoDB docs:
https://www.mongodb.com/docs/manual/reference/method/ObjectId/

Let's walk through implementing a paginated feed of notes as a 
GraphQL query. First, let's define what we'll be creating, folowed
by our schema updates, and lastly our resolver code. For our feed,
we'll want to query our API while optionally passing a cursor as a
parameter. The API should then return a limited amount of data, 
a cursor point representing the last item in the data set, and a 
Boolean value if there is an additional page of data to query. 

With this description, we can update our '/src/schema.js' file 
to define this new query. First, we'll need to add a `NoteFeed`
type to our file:

```
type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
}
```

Next, we add our `noteFeed` query:

```
type Query {
    # add `noteFeed` to our existing queries
    noteFeed(cursor: String): NoteFeed
}
```

With our schema updated, we can write the resolver code for our
query. In '/src/resolvers/query.js', add the following to the 
exported object:

```
noteFeed: async (parent, { cursor } , { models }) => {
    // hardcode the limit to 10 items
    const limit = 10;
    
    // set the default hasNextPage value to false
    let hasNextPage = false;
    
    // if no cursor is passed the default query will be empty
    // this will pull the newest notes from the db
    let cursorQuery = {};

    // if there is a cursor
    // our query will look for notes with an ObjectId less than that 
    // of the cursor
    if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
    }

    // find the `limit + 1` of `notes` in our `db`, sorted newest to oldest
    let notes = await models.Note.find(cursorQuery)
        .sort({_id: -1})
        .limit(limit + 1);

    // if the number of notes we find exceeds our limit
    // set hasNextPage to true and trim the notes to the limit
    if (notes.length) > limit) {
        hasNextPage = true;
        notes = notes.slice(0, -1)
    }

    // the new cursor will be the Mongo object ID of the last item in the feed array
    const newCursor = notes[notes.length - 1]._id;

    return {
        notes,
        cursor: newCursor
        hasNextPage
    };
}
```

OK we were able to update our '/src/resolvers/query.js' file!

With this resolver in place, one can now query our `noteFeed`, which
will return a maximum of 10 results. In the GP, we can write a query
as follows to receive a list of notes, their object IDs, their 
`createdAt` timestamps, the cursor, and `hasNextPage` boolean:

```
query {
    noteFeed {
        notes {
            id
            createdAt
        }
        cursor
        hasNextPage
    }
}
```

this gave us the following output:

```
{
  "data": {
    "noteFeed": {
      "notes": [
        {
          "id": "62ba50d21fea342ac0fd73c1",
          "createdAt": "2022-06-28T00:52:34.513Z"
        },
        {
          "id": "62ad64e8ab1a9232047c7a38",
          "createdAt": "2022-06-18T05:38:48.443Z"
        },
        {
          "id": "62915f9a65b436024c8daaa2",
          "createdAt": "2022-05-27T23:32:42.264Z"
        },
        {
          "id": "628d75728a694b2c3891e7ae",
          "createdAt": "2022-05-25T00:16:50.763Z"
        },
        {
          "id": "6280057a77cc7522a47ab48e",
          "createdAt": "2022-05-14T19:39:38.821Z"
        }
      ],
      "cursor": "6280057a77cc7522a47ab48e",
      "hasNextPage": false
    }
  }
}
```

# HERE -- p. 87, maybe make more notes!

Since we have a more than 10 notes in our database, this returns
a cursor as well as a hasNextPage value of true. With that cursor,
we can query the second page of the feed:

```
query {
    noteFeed(cursor: "<YOUR_OBJECT_ID>") {
        notes {
            id
            createdAt
        }
        cursor
        hasNextPage
    }
}
```

We can continue to do this for each cursor where the
hasNextPage value is `true`. With this implementation
in place, we've created a paginated feed of notes. This
will both allow our UI to request a specific feed of data,
as well as reduce the burden on our server and database!



*/