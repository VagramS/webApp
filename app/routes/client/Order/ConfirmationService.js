const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

// After successful payment, display a confirmation message to the client. 
// Include the order number, total cost, tip amount, and table number in the confirmation message.

const Confirmation_Message = async (req, res, next) => {
    // #swagger.tags = ['Client / Order']\
    // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
    // #swagger.summary = 'Display a confirmation message'
    try {
        const orderId = req.params.orderId; // Assuming the order ID is passed as a URL parameter

        // Fetch the order from the database
        const order = await schemas.order.findById(orderId);
        if (!order) {
            throw new NotFoundError(`Order with ID ${orderId} not found`);
        }

        // Construct the confirmation message
        const message = `Payment successful! Order number: ${order.orderNumber}, Total cost: ${order.totalCost}, Tip amount: ${order.tipAmount}, Table number: ${order.tableNumber}`;

        // Send the confirmation message
        res.status(200).json({ message });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An error occurred while processing your request' });
        }
    }
};

module.exports = {
    Confirmation_Message
};