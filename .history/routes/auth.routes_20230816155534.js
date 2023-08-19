const express = require('express');

const router = express.Router();

router.get('/signup', getSignup);
router.get('/login', getLogin);
router.get('/logout', getLogut);
router.post('/signup', createNewUser);
router.post('/login', login);

module.exports = router;