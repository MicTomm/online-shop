const express = require('express');

const authControllers = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/signup', authControllers.getSignup);
router.get('/login', authControllers.getLogin);
router.get('/logout', authControllers.logout);
router.post('/signup', authControllers.createNewUser);
router.post('/login', authControllers.login);

module.exports = router;