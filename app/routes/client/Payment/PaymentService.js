const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const PayWithStripe = async (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to pay via Stripe.'
    // #swagger.summary = 'Pay with Stripe'
    res.send('Stripe payment');
};

const CompletePayment = async (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to enter payment details and complete the transaction.'
    // #swagger.summary = 'Complete payment'
    res.send('Payment completed');
};

const PayWithApplePay = async (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Allow users to pay via Apple Pay.'
    // #swagger.summary = 'Pay with Apple Pay'
    res.send('Apple Pay');
};

const ShowPaymentStatus = async (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Handle successful and failed payment transactions.'
    // #swagger.summary = 'Show payment status'
    res.send('Payment status');
};

const DisplayPaymentConfirmation = async (req, res) => {
    // #swagger.tags = ["Client / Payment"]
    // #swagger.description = 'Upon successful payment, display a confirmation message along with the order number, total cost, tip amount, and table number.'
    // #swagger.summary = 'Display payment confirmation'
    res.send('Payment confirmation');
};

module.exports = {
    PayWithStripe,
    CompletePayment,
    PayWithApplePay,
    ShowPaymentStatus,
    DisplayPaymentConfirmation
};