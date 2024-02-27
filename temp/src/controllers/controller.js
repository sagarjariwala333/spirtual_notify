// Controllers for app

const AuthService = require('../services/authservice');

// When user tries to Signup, this function gets executed.
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username
    || username.trim() === ''
    || !password
    || password.trim() === ''
    || !email
    || email.trim() === ''
  ) {
    return res.status(404).json({ error: 'Validation error' });
  }

  try {
    const authService = new AuthService(username, email, password);
    const response = await authService.signup();

    return res.status(response.code).json({
      message: response.message ? response.message : response.error,
    });
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

// This function define what will happen when the user tries to login.
const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const authService = new AuthService(username, email, password);
    const response = await authService.authenticate();

    return res.status(response.code).json(response);
  } catch (err) {
    return res.status(404).json({ error: 'Something went wrong' });
  }
};

module.exports = { login, signup };
