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
you'll need to open this to any IP address by using 0.0.0.0/0. With all IP 
addresses whitelisted, one'll then need to set up a 
secure username and password for accessing the data!

Once your IP has been whitelisted and one's user account has been created,
one'll choose the connection method for the database. In this case, it will
be 'Application' conneciton!

From here, one can copy the connection string, which we'll be using in our
production .env file!

> WARNING: Mongo Passwords -- MongoDB Atlas _hex-encodes_ special
characters within passwords. This means that if one uses (and one shoudl!)
any non-alpha or numeric values, one will need to use the hex value for
that code when adding one's password to the connection string. 

The site `ascii.cl` offers the corresponding hex coes for all special
characters. For example, if one's password was `Pizz@2!` one would need
to encode the `@1 and `!` characters. One wwould do this with a `%` followed
bye the hex value. The resulting passowrd would be: `Pizz%402%21`.

With out MongoDB Atlas managed database up and running, we now have
a hosted daa store for our application. In the next step we'll host our
application code and connect it to our database!

// DEPLOYING OUR APPLICATION

The next step in our deployment setup is to deploy our application code.
For the purpose of this book we will use the cloud application platform
Heroku. Teach chose 'Heroku' due ot its excellent user experience, and
generous free tier, but other cloud platforms like Amazon Web Services,
Google Cloud Platform, and Digital Ocean, or Microsoft Azure all
provide alternative hosting environments for Node.js applications.

Before we begin, one will need to visit Heroku's website:
https://heroku.com/apps and create an account. Once your account has been
created, one'll need to install the Heroku command-line tools for one's
operating system.

For macOS one can install the Heroku command-line tools using Homebrew as
follows:

```
$ brew tap heroku/brew && brew install heroku
```

For Windows users, visit Heroku command-line tools guid and donwload the
appropriate installer.

// Project Setup

With the Heroku command-line tools installed, we can setup our project
within the Heroku website. Create a new Heroku project by clicking
New --> Create New App

From here, one'll be prompted to give the application a unqiue name, 
after which one can click the 'Create App' button (Figure 10-7). Going
forward, use the name anywhere one sees `YOUR_APP_NAME`

# HERE -- p. 99!

 */