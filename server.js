'use strict';

const express = require('express');
const app = express();
const queryString = require('query-string');

const USERS = [
  {id: 1,
    firstName: 'Joe',
    lastName: 'Schmoe',
    userName: 'joeschmoe@business.com',
    position: 'Sr. Engineer',
    isAdmin: true,
    password: 'password'
  },
  {id: 2,
    firstName: 'Sally',
    lastName: 'Student',
    userName: 'sallystudent@business.com',
    position: 'Jr. Engineer',
    isAdmin: true,
    password: 'password'
  },
  {id: 3,
    firstName: 'Lila',
    lastName: 'LeMonde',
    userName: 'lila@business.com',
    position: 'Growth Hacker',
    isAdmin: false,
    password: 'password'
  },
  {id: 4,
    firstName: 'Freddy',
    lastName: 'Fun',
    userName: 'freddy@business.com',
    position: 'Community Manager',
    isAdmin: false,
    password: 'password'
  }
];

// write a `gateKeeper` middleware function that:
function gateKeeper(req, res, next) {
  //  1. looks for a 'x-username-and-password' request header
  const headerUserPass = req.get('x-username-and-password');
  //  2. parses values sent for `user` and `pass` from 'x-username-and-password'
  const parsedUserPass = (queryString.parse(headerUserPass));
  //  3. looks for a user object matching the sent username and password values
  //  4. if matching user found, add the user object to the request object
  //     (aka, `req.user = matchedUser`)
  req.user = USERS.find(user => {
    return user['userName'] === parsedUserPass.user;
  });
  next();
}

app.use(gateKeeper);

app.get('/api/users/me', (req, res) => {
  // send an error message if no or wrong credentials sent
  if (req.user === undefined) {
    return res.status(403).json({message: 'Must supply valid user credentials'});
  }
  const {firstName, lastName, id, userName, position} = req.user;
  return res.json({firstName, lastName, id, userName, position});
});


app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

