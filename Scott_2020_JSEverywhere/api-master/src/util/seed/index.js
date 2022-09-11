/* Helper file for seeding user data during testing or local development */

const models = require('../../models');
const seedUsers = require('./users');
const seedNotes = require('./notes');
const db = require('../../db');
require('dotenv').config();

// const DB_HOST = process.env.DB_HOST;

const fs = require('fs');
const { user, pw } = JSON.parse(fs.readFileSync('.\\..\\..\\..\\to_ignore.txt'));
const mongo_url = `mongodb+srv://${user}:${pw}@notes-graphql.6z3u3.mongodb.net/notedly?retryWrites=true&w=majority`;
const DB_HOST = mongo_url;

const seed = async () => {
  console.log('Seeding data...');
  db.connect(DB_HOST);
  const users = await models.User.create(await seedUsers());
  await models.Note.create(await seedNotes(users));
  console.log('Data successfully seeded');
  db.close()
  process.exit(0);
};

seed();

// module.exports = seed;
