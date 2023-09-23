const controllerWrapper = require('../utils/controllerWrapper');
const { registationService, loginService, logoutService } = require('../services/authService');

const registrationController = controllerWrapper(async (req, res) => {

  const newUser = await registationService(req.body);
  res.status(201).json(newUser);
});

const loginController = controllerWrapper(async (req, res) => {
    const accessToken = await loginService(req.body);
    res.json({accessToken});
});

const logoutController = controllerWrapper(async (req, res) => {
  await logoutService(req.user._id);
  res.json({message: 'Success of logout'})
});

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
