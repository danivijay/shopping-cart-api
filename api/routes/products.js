const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')

const router = express.Router()

router.get('/', (req, res, next) => {
  Product.find({})
    .exec()
    .then( docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

router.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  })
  product.save()
    .then(reuslt => {
      res.status(201).json({
        message: 'Handling POST requests to /products',
        product: product
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc)
      if (doc ) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message: 'Invalid request'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findByIdAndUpdate(_id = id, req.body, {new: true})
    .exec()  
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

module.exports = router
