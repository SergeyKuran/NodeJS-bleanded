const { Router } = require('express');

const router = Router();

router.post('/registration'); // 'signup'
router.post('/login'); // "signin"
router.post('/logout');

module.exports = { authRouter: router };
