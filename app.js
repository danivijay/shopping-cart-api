const express = require('express')
const app = express()

const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

module.exports = app
