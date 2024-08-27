const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

// After successful payment, display a confirmation message to the client. 
// Include the order number, total cost, tip amount, and table number in the confirmation message.

const Confirmation_Message = async (req, res) => {
    // #swagger.tags = ['Client / Order']
    // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
    // #swagger.summary = 'Display a confirmation message'
    // #swagger.security = []

    const order_id = req.params.orderid;
    const order = await schemas.Order.findOne({ order_id : order_id });

    if (!order) 
        throw new NotFoundError('Not Found Error', 'Order not found');

    const ConfirmationMessage = `Order number: ${order.order_id}, Total cost: ${order.total_cost}$, Tip amount: ${order.tip_amount}, Table number: ${order.table_id}`;

    res.status(200).send({ message: "Payment confirmed", ConfirmationMessage });
};

module.exports = {
    Confirmation_Message
};