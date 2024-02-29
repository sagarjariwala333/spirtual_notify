const usersFile = 'users.json';
const fs = require('fs');
const bcrypt = require('bcryptjs');
const JwtToken = require('../utils/jwt.utils');
// const User = require('../models/users');
// const Users = require('../models/users');

class AuthService {
  saltRounds = 10; // Number of salt rounds to use

  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }

  async authenticate() {
    // Check if the user exists

    try {
      const users = JSON.parse(fs.readFileSync(usersFile));
      const userExists = users.find(
        (user) => user.username === this.userName && user.email === this.email,
      );

      if (userExists) {
        const isAllowed = await bcrypt.compare(
          this.password,
          userExists.password,
        );
        const tokenRes = JwtToken.generateJWTToken(this.userName, this.email);

        if (isAllowed) {
          return { message: 'Login successful', code: 200, token: tokenRes };
        }
        return { message: 'Wrong Password', code: 200 };
      }
      return { message: 'User doesn not exist', code: 200 };
    } catch (err) {
      return { message: err.toString(), code: 404 };
    }
  }

  async signup() {
    try {
      // Check if username is unique
      const users = JSON.parse(fs.readFileSync(usersFile));
      const isUsernameTaken = users.some(
        (user) => user.username === this.userName,
      );
      if (isUsernameTaken) {
        return { message: 'Username already taken', code: 200 };
      }

      // Validate username format
      if (!/^[a-zA-Z0-9]+$/.test(this.userName)) {
        return { error: 'Invalid username', code: 200 };
      }

      // Create hash of password
      await bcrypt.hash(this.password, this.saltRounds, (err, result) => {
        if (result) {
          // Add user to the list
          users.push({
            username: this.userName,
            email: this.email,
            password: result,
          });
          fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

          return { message: 'Signup successful', code: 200 };
        }

        if (err) {
          return { message: err.toString(), code: 200 };
        }
        return { message: err, code: 200 };
      });

      return { message: 'Success', code: 200 };
    } catch (err) {
      return { message: err.toString(), code: 404 };
    }
  }
}

module.exports = AuthService;
