const express = require("express");

const orderControllers = require('../controllers/orders.controllers');

const router = express.Router();

router.get('/', orderControllers.getOrders);

router.post('/', orderControllers.placeOrder);

module.exports = router;