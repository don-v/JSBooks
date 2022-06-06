const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
    AuthenticationError, 
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');


module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: 'Random User'
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { content, id }, { models }) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    },
    signUp: async(parent, { username, email, password }, { models }) => {
        // normalize email address
        email = email.trim().toLowerCase();

        // hash the passowrd
        const hashed = await bcrypt.hash(password, 10);

        // create the gravatar url
        const avatar = gravatar(email)

        // create a user:
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });
        } catch (error) {
            console.log(error);
            // if there's an error creating the account, throw an error
            throw new Error('Error creating account');
        }
    },
}