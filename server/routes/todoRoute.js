const router = require('express').Router();
const { show, add, erase, finish, edit } = require('../controllers/todoController');
const { auth } = require('../middlewares/auth');

router.get('/', auth, show);
router.post('/', auth, add);
router.delete('/', auth, erase);
router.patch('/', auth, finish);
router.put('/', auth, edit)

module.exports = router;