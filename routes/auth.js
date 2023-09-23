const { Router } = require('express');
const { registrationValidationSchema, loginValidationSchema } = require('../utils/validation/authValidationSchemas');
const { registrationController, loginController, logoutController } = require('../controllers/authControllers');
const validateBody = require('../utils/validateBody');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/registration', validateBody(registrationValidationSchema), registrationController); // 'signup'
router.post('/login', validateBody(loginValidationSchema), loginController); // "signin"
router.post('/logout', auth, logoutController);

module.exports = { authRouter: router };
