const express = require('express');

const authControllers = require('../controllers/base.controllers');

const router = express.Router();

router.get('/', authControllers.redirHome);
router.get('/home', authControllers.getHome);
router.get('/401', );
router.get('403', );

module.exports = router;