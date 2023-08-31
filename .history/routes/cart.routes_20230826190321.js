const express = require('express');
const cartControllers = require('../controllers/cart.controllers');


const router = express.Router();

router.post('', cartControllers.addToCart);

module.exports = router;
