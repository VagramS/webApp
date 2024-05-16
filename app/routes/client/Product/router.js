const router = require('express-promise-router')();
const ProductService = require('./ProductService');

router.get('/:productId', ProductService.DisplayProductById);

module.exports = router;