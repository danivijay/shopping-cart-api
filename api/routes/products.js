const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/product')
const multer = require('multer')

const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true); // accept file
  } else {
    cb(null, false) // reject file
  }
}

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })


router.get('/', (req, res, next) => {
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
});

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
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
})

router.get('/:productId', (req, res, next) => {
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
})

router.patch('/:productId', checkAuth, (req, res, next) => {
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
})

router.delete('/:productId', checkAuth, (req, res, next) => {
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
