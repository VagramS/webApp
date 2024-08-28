const router = require('express-promise-router')();
const CartService = require('./CartService');

router.get('/:tableid', CartService.ShowCart);

router.post('/add/:mealid/:tableid', CartService.AddToCart);

router.patch('/update/:tableid', CartService.UpdateCart);

router.delete('/delete/:mealid/:tableid', CartService.DeleteFromCart);

module.exports = router;
