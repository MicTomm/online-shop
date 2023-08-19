const express = require('express');

const authControllers = require('../controllers/auth.controllers');

const router = express.Router();



router.get('/signup', getSignup);
router.get('/login', getLogin);
router.get('/logout', logut);
router.post('/signup', createNewUser);
router.post('/login', login);

module.exports = router;