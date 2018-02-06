const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Orders fetched"
  })
})

router.post('/', (req, res, next) => {
  const order = {
    productid: req.body.productid,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: "Order added",
    order: order
  })
})

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    message: "Specific order fetched",
    id: id
  })
})

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    message: "Order Deleted",
    id: id
  })
})

module.exports = router
