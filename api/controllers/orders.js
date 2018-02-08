const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({
        error : err
      })
    })
}

exports.orders_post = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      const order = new Order({
        product: req.body.productId,
        quantity: req.body.quantity
      })
      return order.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: "Order added",
        order: result
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
}

exports.orders_get_one = (req, res, next) => {
  const id = req.params.orderId
  Order.findById(id)
    .select('_id product quantity')
    .populate('product', 'name')
    .exec()
    .then(order => {
      res.status(200).json(order)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
}

exports.orders_delete = (req, res, next) => {
  const id = req.params.orderId
  Order.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
}
