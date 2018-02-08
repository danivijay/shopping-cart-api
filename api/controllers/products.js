const mongoose = require('mongoose')
const Product = require('../models/product')

exports.products_get_all = (req, res, next) => {
  Product.find({})
    .select('_id name price productImage')
    .exec()
    .then( docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

exports.products_post = (req, res, next) => {
  console.log(req.file)
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
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
}

exports.products_get_one = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .select('_id name price productImage')
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
}

exports.products_patch = (req, res, next) => {
  const id = req.params.productId
  const newProduct = {}
  if (req.body.name) {
    newProduct.name = req.body.name
  }
  if (req.body.price) {
    newProduct.price = req.body.price
  }
  if(Object.getOwnPropertyNames(newProduct).length !== 0) {
    Product.findByIdAndUpdate(_id = id, newProduct, {new: true})
      .exec()  
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
      })
  } else {
    res.status(200).json({ error: 'Nothing to update' })
  }
}

exports.products_delete = (req, res, next) => {
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
}
