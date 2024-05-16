const router = require('express-promise-router')();
const CartService = require('./CartService');

router.post('/add/:productId', CartService.AddToCart);

router.get('/', CartService.ShowCart);

router.delete('/remove/:productId', CartService.RemoveFromCart);

router.patch('/update/:productId', CartService.AdjustQuantity);

router.post('/Comment', CartService.AddComment);

router.get('/total', CartService.DisplayTotal);

router.post('/tip', CartService.Tip);

module.exports = router;