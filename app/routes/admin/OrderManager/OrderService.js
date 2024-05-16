const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const ViewAllActiveOrders = async (req, res, next) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'View all active orders in real-time'
    // #swagger.summary = 'View all active orders'
    res.send('View all active orders');
};

const UpdateOrderStatus = async (req, res, next) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'Mark orders as fulfilled or cancelled'
    // #swagger.summary = 'Update order status'
    res.send('Update order status');
};

module.exports = {
    ViewAllActiveOrders,
    UpdateOrderStatus
};
