const express = require("express");

const orderControllers = require('../controllers/orders.controllers');

const router = express.Router();

router.get('/orders', orderControllers.getOrders);

//router.post('/orders', orderControllers.placeOrder);

module.exports = router;