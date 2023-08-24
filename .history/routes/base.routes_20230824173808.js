const express = require('express');

const authControllers = require('../controllers/base.controllers');

const router = express.Router();

router.get('/', authControllers.redirHome);
router.get('/home', authControllers.getHome);

module.exports = router;