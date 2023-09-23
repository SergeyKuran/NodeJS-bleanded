const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const HttpError = require('../utils/HttpError');
const { assignToken } = require('../utils/assignTokens');

const registationService = async (body) => {
  const user = await User.findOne({ email: body.email });
  console.log(user);
  if (user) {
    throw new HttpError(409, 'Email should be unique');
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);
  const newUser = await User.create({ ...body, password: hashedPassword });
  return {
    name: newUser.name,
    email: newUser.email,
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

const logoutService = async () => {
  return;
};

module.exports = {
  registationService,
  loginService,
  logoutService,
};
