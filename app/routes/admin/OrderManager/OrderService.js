const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const ViewAllActiveOrders = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'View all active orders in real-time'
    // #swagger.summary = 'View all active orders'
    // #swagger.security = [{ "Bearer": [] }]

    const orders = await schemas.Order.find({order_status: 'Pending'});
    if(!orders) 
        throw new NotFoundError('Not Found Error', 'No active orders');
    
    res.status(200).send({message: 'All active orders', orders});
};

const UpdateOrderStatus = async (req, res) => {
    // #swagger.tags = ['Admin / Order Manager']
    // #swagger.description = 'Mark orders as fulfilled or cancelled'
    // #swagger.summary = 'Update order status'
    // #swagger.security = [{ "Bearer": [] }]

    const orderid = req.params.orderid;
    const {order_status} = req.body;
    const order = await schemas.Order.findOne({order_id: orderid});
    
    if(!order) 
        throw new NotFoundError('Not Found Error', 'Order not found');
    else
        order.order_status = order_status;

    await order.save();

    res.status(200).send({message: 'Order status updated', order});
};

module.exports = {
    ViewAllActiveOrders,
    UpdateOrderStatus
};
