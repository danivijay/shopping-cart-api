const express = require('express')

const router = express.Router()

console.log('orders')
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders GET'
  })
})

module.exports = router
