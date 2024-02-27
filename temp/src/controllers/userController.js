const UserService = require('../services/userService');

const userController = (req, res) => {
  const userService = new UserService();
  const response = userService.getAllUsers(req.user);

  return res.status(200).json(response);
};

module.exports = userController;
