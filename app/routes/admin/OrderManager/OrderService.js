const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const ViewAllActiveOrders = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'View all active orders in real-time'
    res.send('View all active orders');
};

const UpdateOrderStatus = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'Mark orders as fulfilled or cancelled'
    res.send('Update order status');
};

module.exports = {
    ViewAllActiveOrders,
    UpdateOrderStatus
};
