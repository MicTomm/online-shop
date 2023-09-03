const express = require("express");

const orderControllers = require('../controllers/orders.controllers');

const router = express.Router();

router.get('/orders', orderControllers.getOrders);

module.exports = router;