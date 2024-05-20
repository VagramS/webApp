const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

// After successful payment, display a confirmation message to the client. 
// Include the order number, total cost, tip amount, and table number in the confirmation message.

const Confirmation_Message = async (req, res) => {
    // #swagger.tags = ['Client / Order']
    // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
    // #swagger.summary = 'Display a confirmation message'
    // #swagger.security = []


    
    res.status(200).send({message: 'Order confirmed', order});
};

module.exports = {
    Confirmation_Message
};