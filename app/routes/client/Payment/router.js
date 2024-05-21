const router = require('express-promise-router')();
const PaymentService = require('./PaymentService');

router.get('/confirmation', PaymentService.DisplayPaymentConfirmation);

router.post('/stripe', PaymentService.PayWithStripe);

router.post('/complete', PaymentService.CompletePayment);

router.post('/applepay', PaymentService.PayWithApplePay);

router.post('/status', PaymentService.ShowPaymentStatus);

module.exports = router;