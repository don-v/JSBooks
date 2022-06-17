const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
    AuthenticationError, 
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');


module.exports = {
    newNote: async (parent, args, { models, user}) => {
        // if here is no user on the context, throw an authentication error
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
    
        return await models.Note.create({
            content: args.content,
            // reference the author's `mongo` id
            author: mongoose.Types.ObjectId(user.id)
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

            // create and return the json web token
            return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        
        } catch (error) {
            console.log(error);
            // if there's an error creating the account, throw an error
            throw new Error('Error creating account');
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
          // normalize email address
          email = email.trim().toLowerCase();
        }
      
        const user = await models.User.findOne({
          $or: [{ email }, { username}]
        });
      
        // if no user is found, throw an authentication error:
        if (!user) {
          throw new AuthenticationError('Error signing in');
        }
      
        // if the passwords don't match, throw an authentication error:
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
          throw new AuthenticationError('Error signing in');
        }
      
        // create and return the json web token:
        return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
      },
}