const router = require('express-promise-router')();
const PaymentService = require('./PaymentService');

router.post('/stripe', PaymentService.PayWithStripe);

router.post('/complete', PaymentService.CompletePayment);

router.post('/applepay', PaymentService.PayWithApplePay);

router.post('/status', PaymentService.ShowPaymentStatus);

router.get('/confirmation', PaymentService.DisplayPaymentConfirmation);

module.exports = router;