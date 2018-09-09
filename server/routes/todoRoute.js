const router = require('express').Router();
const { show, add } = require('../controllers/todoController');
const { auth } = require('../middlewares/auth');

router.get('/', auth, show);
router.post('/', auth, add);
// router.

module.exports = router;