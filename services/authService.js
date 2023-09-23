const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const HttpError = require('../utils/HttpError');
const { assignToken } = require('../utils/assignTokens');

const registationService = async (body) => {
  const user = await User.findOne({ email: body.email });
  
  if (user) {
    throw new HttpError(409, 'Email should be unique');
  }
  
  const newUser = await User.create(body);
  return {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password
  };
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new HttpError(401, 'Email or password is incorrect');
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Email or password is incorrect');
  }
  const { accessToken, refreshToken } = assignToken(user);
  await User.findByIdAndUpdate(user._id, { refreshToken });

  return accessToken;
};

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { refreshToken: null });
};

module.exports = {
  registationService,
  loginService,
  logoutService,
};
