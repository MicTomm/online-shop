const express = require('express');
const cartControllers = require('../controllers/cart.controllers');


const router = express.Router();

router.post('/cart/:id', cartControllers.addToCart);

module.exports = router;
