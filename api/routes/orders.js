const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const orderController = require('../controllers/orders')

const Order = require('../models/order')
const Product = require('../models/product')

const checkAuth = require('../middleware/check-auth')

router.get('/', orderController.orders_get_all)

router.post('/', checkAuth, orderController.orders_post)

router.get('/:orderId', checkAuth, orderController.orders_get_one)

router.delete('/:orderId', checkAuth, orderController.orders_delete)

module.exports = router
