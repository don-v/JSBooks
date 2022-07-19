/* 

// DEPLOYING OUR API

Imagine if each time a user wanted to access our API to create,
read, update, or delete a note we had to go meet them, laptop
in tow. Currently, this is how our API works, ais it is running 
only on our individual computer.

We can resolve this by _deploying_ our application to a web
server!

In this chapter, we'll take two setps:

1. First, we'll set up a remote database that our API can 
access

2. Second, we'll deploy our API code to a server and connect
it to the database!

Once we've followed these steps, we can access our API from any
web-connected computer, including the web, desktop, and mobile
interfaces that we'll develop!

// HOSTING OUR DATABASE

For the first step we'll use a hosted database solution. For our
Mongo database, we'll be using MongoDB Atlas. This is a fully managed
cloud offering backed by the organiztion behind Mongo itself. Additionally,
they offer a free tier that will work well for our initial deployment.

First, we visit `mongodb.com/cloud/atlas' and create an account. Once
we've created an account, one'll be prompted to create a database. From
this screen one can manage the settings of our sandbox database, but 
teach recommends sticking with the defaults for now.

These are:

* Amazon's AWS as the database host, though Google's Cloud Platform and
Microsoft's Azure are also offered as options.

* The closeset region with a 'free tier' otpion

* cluster Tier with a default value of "M0 Sandbox (Shared RAM, 512 MB Storage)"

* Additoinal Settings, which we can leave as the defaults

* Cluster Name, which we can leave as the default.

From here, click 'Create Cluster', at which point it will take a few
minutes for Mongo to set up the database.

Next, you will see the 'Clusters' page, where one can manage one's 
individual database cluster.

From the 'Clusters' screen, click 'Connect', where one'll be prompted to 
set up one's connection security. The first step will be to whitelist 
one's IP address. Because our application will have a dynamic IP address,
you'll need to open this to any IP address by using 0.0.0.0/0.

# HERE -- p. 94!

 */