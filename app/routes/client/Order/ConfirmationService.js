const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

// After successful payment, display a confirmation message to the client. 
// Include the order number, total cost, tip amount, and table number in the confirmation message.

const Confirmation_Message = async (req, res) => {
    // #swagger.tags = ['Client / Order']
    // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
    // #swagger.summary = 'Display a confirmation message'
    // #swagger.security = []

    const order_id = req.body.order_id;

    if (!order) 
        throw new NotFoundError('Order not found');

    const confirmationMessage = `Order confirmed. Order number: ${order.order_id}, Total cost: ${order.total_cost}, Tip amount: ${order.tipAmount}, Table number: ${order.table.number}`;

    res.status(200).send({ message: "Payment confirmed", confirmationMessage });
};

module.exports = {
    Confirmation_Message
};