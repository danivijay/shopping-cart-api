const express = require('express')

const router = express.Router()

console.log('1')

router.get('/', (req, res, next) => {
  res.status(200).json({
      message: 'Handling GET requests to /products'
  });
  console.log('2')
});

router.post('/', (req, res, next) => {
  res.status(200).send({
    message: 'products GET'
  })
  console.log('3')
})
console.log('4')

module.exports = router
