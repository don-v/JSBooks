// Added in Chapter 6: CRUD Operations -- part of refactoring
// process.

const { gql } = require('apollo-server-express');

module.exports = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation {
        newNote(content: String!): Note!
    }
`;