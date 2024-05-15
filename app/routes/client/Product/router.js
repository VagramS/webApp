const router = require('express').Router();
const ProductService = require('./ProductService');

router.get('/:productId', ProductService.DisplayProductById);

module.exports = router;