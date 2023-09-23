const HttpError = require('../utils/HttpError');
const jwt = require('jsonwebtoken');
const { assignToken } = require('../utils/assignTokens');
const { User } = require('../models/user');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Unauthorized. No token'));
  }

  const payload = jwt.decode(token);
  let fetchUser;

  try {
    fetchUser = await User.findOne({ _id: payload.id });
    if (!fetchUser || !fetchUser.refreshToken) {
      return next(new HttpError(401, 'Unauthorized. User not found'));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = fetchUser;

    next();
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      return next(new HttpError(401, 'Unauthorized. Invalid token'));
    }

    try {
      jwt.verify(fetchUser.refreshToken, REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = assignToken(fetchUser);

      await User.findByIdAndUpdate(fetchUser._id, { refreshToken });

      res.json({ accessToken });
    } catch (error) {
      return next(new HttpError(401, 'Refresh token is expired'));
    }
  }
};

module.exports = auth;
