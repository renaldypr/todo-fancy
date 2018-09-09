const router = require('express').Router();
const { register, login, loginfb } = require('../controllers/userController')

router.post('/', register);
router.post('/login', login);
router.post('/loginfb', loginfb);

module.exports = router;