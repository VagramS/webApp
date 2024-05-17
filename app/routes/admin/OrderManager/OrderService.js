const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const ViewAllActiveOrders = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'View all active orders in real-time'
    // #swagger.summary = 'View all active orders'
    res.send('View all active orders');
};

const UpdateOrderStatus = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'Mark orders as fulfilled or cancelled'
    // #swagger.summary = 'Update order status'
    res.send('Update order status');
};

module.exports = {
    ViewAllActiveOrders,
    UpdateOrderStatus
};
