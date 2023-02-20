# CHAPTER 17: DEPLOYING A WEB APPLICATION

When teach began web development, 'deployment' meant 
uploading files from local machine to a web server through
an FTP client.

There were no build steps or pipelines, meaning that the 
raw files on teach's machine were the same as those on the
web server. If something went wrong, teach would either
frantically try to fix the issue or roll back the change
by replacing it with copies of the old files. This wild
west approach worked OK at the time, but also led to a lot
of site downtime and unexpected issues.

In today's web development, the needs of our local development
environment and our web servers are quite different. On teach's
local machine, teach wants to see instant changes when teach
updates a file and have uncompressed files for debugging. On 
teach's web server, teach only expects to see changes when
he deploys them, and values small file sizes. In this chapter,
we'll look at one way that we can deploy a static application
to the web.

## STATIC WEBSITES

A web browser parses HTML, CSS, and JS to generate the web
pages that we interact with. Unlike frameworks such as Express,
Rails, and Django, which generate the markup for a page 
server-side at the time of the request, static websites are
simply a collection of HTML, CSS, and JS stored on a server.
This can range in complexity from a single HTML file containing
markup to complicated frontend build processes that compile 
templating languages, multiple JS files, and CSS pre-processors.
In the end, however, static websites are a collection of those
three file types. 

Our application, 'Notedly', is a static web application. It 
contains some markup, CSS, and JS. Our build tool, Parcel...:
`https://parceljs.org` ...,
compliles the components that we write into files usable by 
the browser. In local development, we run a web server and 
these files are updated on the using 'Parcel''s hot module
replacement feature. If we look at our 'package.json' file, 
you'll see that I've included two `deploy` scripts:

```
"scripts": {
    "deploy:src": "parcel build src/index.html --public-url ./",
    "deploy:final": "parcel build final/index.html --public-url ./"
}
```

To build the application, open your terminal application, `cd` 
into the root of your _web_ directory, which contains the project,
and then run the `build` command:

```
# if you're not already in the web directory, be sure to cd into it
$ cd Project/notedly/web
# build the files form the src directory
$ npm run deploy:src
```

If one has been following along with the book and developing the
application in the `src` directory, running `npm run deploy:src`
in the terminal, as just described, will generate the built application
from one's code.  If one would prefer to use the final version of
the application that is bundled with the sample code, using `npm
run deploy:final` will build the code eform teh final application 
directory.

In the rest of the chapter, teach will demonstrate one way to deploy
a statically built application, but these files could be hosted 
anywhere that can server HTML-- form a web hosting provider to a 
Raspberry Pi left runnong on one's desk. While there are many 
tangible benefits to the type of process teach will walk us
through, one's deployment could be as simple as updating the 
_.env_ file to point to the remote API, running the build script, 
and uploading the files. 

> NOTE: SERVER-SIDE RENDERED REACT: Though we're building our React
application as a static web application, it is also possible to 
render JSX on the server. This technique is often referred to as
"universal JS" and can have many benefits, including performance
gains, client-side JS fallbacks, and SEO improvements. Frameworks like
'Next.js' (`https://nextjs.org`) have sought to simplify the setup.
Though we're not covering server-side rendered JS applications in
this book, teach highly recommends exploring this approach once 
once is comfortable with client-side JS app development. 

## OUR DEPLOYMENT PIPELINE

For our application's deployment, we'll make use of a simple pipeline,
which will allow us to automatically deploy changes to our codebase. 
For our pipeline we'll be using 2 services. The first will be our 
github repository, Github (`https://github.com`). The second will be our
host, 'Netlify' (`https://www.netlify.com`). Teach chose 'Netlify' for 
its extensive, but easy-to-use, feature set for deployments as well as
its focus on static and serverless applications.

The goal is for any commit to the `master` branch of our application
to be automatically deployed to our webhost. We could visualize the 
process as shown in Figure 17-1:

Nodes: {0:'Personal Computer', 1: 'Github', 2: 'Netlify'}
Edges: {
    (0,1): 'git commit + push', 
    (1,2): '', 
    (2,): [
        'Netlify runs build scripts', 
        'Built code published to web server'
        ]
    }

### HOSTING SOURCE CODE WITH GIT

The first step in our deployment process is to  set up our source
code repository. One may have already done this, in which case, 
feel free to skip ahead.  As noted before we'll be using GitHub
(`https://github.com`), but this process could be configurd with 
other public Git hosts, such as GitLab (`https://about.gitlab.com`)
or Bitbucket (`https://butbucket.org`).

> GitHub Repositories: We'll be creating a new GitHub repository, 
but if you prefer, you can use the official code sample at 
`https://github.com/javascripteverywhere/web by creating a fork to
one's own GitHub account.

First, navigate to Github and create an account and sign in to 
one's existing account. Then click the New Repository button. Provide
a name and click the Create Repository button (Figure 17-2).

Now, in your terminal application, navigate to one's web application
direcotry, set the 'Git' origin to the new gitHub repository, and
push the code. Because we are updating an existing Git repo, our
instructions will differ slightly from Github's:

```sh
# first navigate to the directory if you're not already there
cd Projects/notedly/web
# update the Github remote origin to match your repository
git remote set-url origin git://YOUR.GIT.URL
# push the code to the new Github repository
git push -u origin master
```

Now, if one navigates to 
`https://github.com/<your-username>/<your-repo-name>`, one will
see the source code of the application.

#### DEPLOY WITH 'Netlify'

With our source code in a remoteee Git repo, we can now configure
our web host, 'Netlify', to build and deploy our code. First, go
to `netlify.com` and register for an account. Once one has created
an account, click the "New site from Git" button. This will walk
one through setting up one's site deployment:

1. Choose your Git provider by selecting 'Github', which will connect
and authorize your GitHub account

2. Next, select the repo that contains the source code

3. Finally, set up your build settings

For our build settings, add the following (Figure 17-3):

1. Build command: `npm run deploy:src` (or `npm run deploy:final`, if deploying
the 'final' example code)

2. Publish directory: `dist`

3. Under "Advanced settings," click "New variable" and add a variable
name of `API_URI` with a variable value of 
`https://<your-api-name>.herokuapp.com/api` (this is the URL of the API
application, which we deployed to Heroku)

Once you've configured the application, click the "Deploy site" button.
After a few minutes your application will be running at the 
'Netlify'-supplied URL. Now, anytime we push a change to our GitHub
repo, our site will be automatically deployed!

> SLOW INITIAL LOAD: Our deployed we application will be loading data
from our deployed Heroku API. With Heroku's free plan, application 
containers sleep after one hour of inactivity. If one hasn't 
used our API in a while, the initial data load will be slow while
the container spins back up!

<!-- HERE -- p. 206! -->