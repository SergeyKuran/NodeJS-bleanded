const HttpError = require('../utils/HttpError');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  const payload = jwt.decode(token);
  let fetchUser;

  try {
    fetchUser = await User.findOne({ _id: payload._id });
    if (!fetchUser || !fetchUser.refreshToken) {
      return next(new HttpError(401, 'Unauthorized'));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = fetchUser;

    next();
  } catch (error) {}
};

module.exports = auth;
