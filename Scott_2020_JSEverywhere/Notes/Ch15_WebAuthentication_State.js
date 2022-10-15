/* 
// CHAPTER 15: WEB AUTHENTICATION AND STATE

Client-side web authentication: Our users fill outa form and will be 
handed a key to the website, in the form of a password alongside a
token stored in their browser. When they return to the site they 
will either be automatically authenticated with the token, or be able
to sign back in using their password.

In this chapter, teach will build out a web authentication system with
our GraphQL API. To do this, we'll be building forms, storing JWTs in 
the browser, sending tokens with each request, and keeping track of our
application's state.

// CREATING A SIGN-UP FORM

To get started with our application's client authentication, we can
create a user sign-up 'React' component. Before doing so, let's map out
how the component will work.

first, a user will navigate to '/signup' route within our application.

# HERE -- p. 153!

*/