/* 
// CHAPTER 14: WORKING IWTH APOLLO CLIENT

The modem-based connections for internet access from previous
decades, though quite slow and unreliable, still capture the 
essence of modern-day service communications:

1. services request a connection
2. make the connection
3. send a request
4. recieve the response

Our client application will work in a similar manner. We will
first make a connection to our server API application, and if
successful, make requests to that server.

In this chapter, we will use Apollo Client to connect to our
API. Once connected, we'll write a GraphQL query, which will be
used to display data on a page. We'll also introduce pagination, 
both within the API query and in our interface components!

> WISDOM: Running the API locally -- The devlopment of our web
client application will require access to a local instance of our
API. If you've been following along with the book, one may already
have the Notedly API and its database up and running on machine!

If not, teach has added instructions to Appendix A on how to get
a copy of the API up and running along with some sample data.
If one already has the API running, but would like some additional
data to work with, run execute `npm run seed` from the root of
the API project directory!

# Finished 09/11/2022 -- copied seed to src folder from final; 
adjust package.json; update DB_HOST uri, set content without 
accessing url for lorem ipsum 

# HERE -- updated bcrypt - bcryptjs; test npm run seed next!



*/