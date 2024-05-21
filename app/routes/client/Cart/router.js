const router = require('express-promise-router')();
const CartService = require('./CartService');

router.get('/', CartService.ShowCart);

router.get('/total', CartService.DisplayTotal);

router.post('/add/:productId', CartService.AddToCart);

router.post('/Comment', CartService.AddComment);

router.post('/tip', CartService.Tip);

router.patch('/update/:productId', CartService.AdjustQuantity);

router.delete('/remove/:productId', CartService.DeleteFromCart);

module.exports = router;