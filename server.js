'use strict';

const express = require('express');
const app = express();
const queryString = require('query-string');


//The app you'll be writing this middleware for has a single endpoint, /api/users/me



// For this challenge, we're hard coding a list of users, because
// we haven't learned about databases yet. Normally, you'd store
// user data in a database, and query the database to find
// a particular user.
//
// ALSO, for this challenge, we're storing user passwords as
// plain text. This is something you should NEVER EVER EVER 
// do in a real app. Instead, always use cryptographic
// password hashing best practices (aka, the tried and true
// ways to keep user passwords as secure as possible).
// You can learn more about password hashing later
// here: https://crackstation.net/hashing-security.htm
const USERS = [
  {id: 1,
    firstName: 'Joe',
    lastName: 'Schmoe',
    userName: 'joeschmoe@business.com',
    position: 'Sr. Engineer',
    isAdmin: true,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  },
  {id: 2,
    firstName: 'Sally',
    lastName: 'Student',
    userName: 'sallystudent@business.com',
    position: 'Jr. Engineer',
    isAdmin: true,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  },
  {id: 3,
    firstName: 'Lila',
    lastName: 'LeMonde',
    userName: 'lila@business.com',
    position: 'Growth Hacker',
    isAdmin: false,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  },
  {id: 4,
    firstName: 'Freddy',
    lastName: 'Fun',
    userName: 'freddy@business.com',
    position: 'Community Manager',
    isAdmin: false,
    // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
    password: 'password'
  }
];

// app.get('/', (req, res) => {
//   res.send('hello');
// });

// write a `gateKeeper` middleware function that:
//  1. looks for a 'x-username-and-password' request header
//  2. parses values sent for `user` and `pass` from 'x-username-and-password'
//  3. looks for a user object matching the sent username and password values
//  4. if matching user found, add the user object to the request object
//     (aka, `req.user = matchedUser`)
function gateKeeper(req, res, next) {
  const headerUserPass = req.get('x-username-and-password');
  console.log(headerUserPass);
  console.log(queryString.parse(headerUserPass));
  //const {user, password} = req.query;
  // console.log('user', user, 'password', password);
  // res.send(`user', ${user}, 'password', ${password}`);
  // res.json({user, password});
  // queryString.parse(req.user)
  // const headerUserPass = req.get(users)
  next();
}

app.get('/', gateKeeper);



// Add the middleware to your app!

// this endpoint returns a json object representing the user making the request,
// IF they supply valid user credentials. This endpoint assumes that `gateKeeper` 
// adds the user object to the request if valid credentials were supplied.
app.get('/api/users/me', (req, res) => {
  // send an error message if no or wrong credentials sent
  if (req.user === undefined) {
    return res.status(403).json({message: 'Must supply valid user credentials'});
  }
  // we're only returning a subset of the properties
  // from the user object. Notably, we're *not*
  // sending `password` or `isAdmin`.
  const {firstName, lastName, id, userName, position} = req.user;
  return res.json({firstName, lastName, id, userName, position});
});


app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

