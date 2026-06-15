const router = require('express').Router();
const controller = require('../controller/userController');

router.get('/login', controller.showLoginForm);
router.post('/login', controller.loginUser);
router.post('/logout', controller.logoutUser);

module.exports = router;
