const express = require('express')
const router = express.Router()

const multer = require('multer')

const productController = require('../controllers/products')

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


router.get('/', productController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), productController.products_post)

router.get('/:productId', productController.products_get_one)

router.patch('/:productId', checkAuth, productController.products_patch)

router.delete('/:productId', checkAuth, productController.products_delete)

module.exports = router
