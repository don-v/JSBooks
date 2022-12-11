/* 
CHAPTER 16: CREATE, READ, UPDATE, AND DELETE OPERATIONS

Our 'Notedly' application is a CRUD (create, read, update, delete) 
application. An authenticated user can create new notes, read notes,
update a note's contents or if a note is favorited or not, and delete
a note. In this chapter, we implmement this CRUD functionality within
our web user interface. To accomplish these tasks, we'll be writing
GraphQL mutations and queries.

// CREATING NEW NOTES

Currently, we have the means to view notes, but not a way to create
them. This is akin to having a notebook without a pen. Let's add 
the ability for users to create new notes. We'll do this by creating
a `textarea` form in which users can write the note. When the user
submits the form, we'll perform a GraphQL mutation to create the note
in our database.

# HERE -- p. 177!


*/