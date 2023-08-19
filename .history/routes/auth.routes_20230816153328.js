const express = require('express');

const router = express.Router();

router.get('/signup');
router.get('/login');
router.get('/logout');
router.post('/signup');
router.post('/login');

module.exports = router;