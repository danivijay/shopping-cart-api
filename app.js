const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

const app = express()

// mongoose.connect('mongodb+srv://node-shop:' + 
//   process.env.MONGO_ATLAS_PW + 
//   '@node-rest-shop-6p4bs.mongodb.net/test')
mongoPw = process.env.MONGO_ATLAS_PW || 'node-shop'

mongoose.connect('mongodb://node-shop:'+ mongoPw +'@node-rest-shop-shard-00-00-6p4bs.mongodb.net:27017,node-rest-shop-shard-00-01-6p4bs.mongodb.net:27017,node-rest-shop-shard-00-02-6p4bs.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

module.exports = app
