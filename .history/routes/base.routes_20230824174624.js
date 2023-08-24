const express = require('express');

const baseControllers = require('../controllers/base.controllers');

const router = express.Router();

router.get('/', baseControllers.redirHome);
router.get('/home', baseControllers.getHome);
router.get('/401',  baseControllers.get401);
router.get('403', baseControllers.get403);

module.exports = router;