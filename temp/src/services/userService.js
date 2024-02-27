/* eslint-disable class-methods-use-this */

const fs = require('fs');

const usersFile = 'users.json';

class UserService {
  getAllUsers(requester) {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const resobj = {
      requester,
      data: users,
    };
    return resobj;
  }
}

module.exports = UserService;
