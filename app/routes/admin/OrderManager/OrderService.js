const { NotFoundError } = require('../../../utils/Errors/index');
// const moment = require('moment-timezone');

const ViewAllActiveOrders = async (req, res) => {
  // #swagger.tags = ['Admin / Order Manager']
  // #swagger.description = 'View all active orders in real-time'
  // #swagger.summary = 'View all active orders'
  // #swagger.security = [{ "Bearer": [] }]

  const orders = await schemas.Order.find({ order_status: 'Pending' }, {
    _id: 0,
    order_id: 1,
    table_id: 1,
    order_items: 1,
    total_cost: 1,
    tip_amount: 1,
    order_status: 1,
    created_at: 1,
  });

  if (!orders || orders.length === 0)
    throw new NotFoundError('Not Found Error', 'No active orders');

  res.status(200).send({ message: 'All active orders', orders });
};

const UpdateOrderStatus = async (req, res) => {
  // #swagger.tags = ['Admin / Order Manager']
  // #swagger.description = 'Mark orders as fulfilled or cancelled'
  // #swagger.summary = 'Update order status'
  // #swagger.security = [{ "Bearer": [] }]

  const { orderid } = req.params;
  const { order_status } = req.body;
  const order = await schemas.Order.findOne({ order_id: orderid });

  if (!order || order.length === 0)
    throw new NotFoundError('Not Found Error', 'Order not found');
  else
    order.order_status = order_status;

  await order.save();

  res.status(200).send({ message: 'Order status updated', order });
};

module.exports = {
  ViewAllActiveOrders,
  UpdateOrderStatus,
};
