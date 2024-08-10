const schemas = require("../../../Utils/db/Models.js");
const {
  BadRequestError,
  NotFoundError,
} = require("../../../Utils/Errors/index.js");

// After successful payment, display a confirmation message to the client.
// Include the order number, total cost, tip amount, and table number in the confirmation message.

const Confirmation_Message = async (req, res) => {
  // #swagger.tags = ['Client / Order']
  // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
  // #swagger.summary = 'Display a confirmation message'
  // #swagger.security = []

  const order_id = req.params.orderid;
  const order = await schemas.Order.findOne({ order_id: order_id });

  if (!order) throw new NotFoundError("Not Found Error", "Order not found");

  if (order.payment_status !== "Paid")
    throw new BadRequestError("Bad Request Error", "Payment not confirmed");

  const table = await schemas.Table.findOne({ table_id: order.table_id });

  if (!table) throw new NotFoundError("Not Found Error", "Table not found");

  const confirmationMessage = `Order number: ${order.order_id}, Total cost: ${order.total_cost}, Tip amount: ${order.tip_amount}, Table number: ${order.table_id}`;

  res.status(200).send({ message: "Payment confirmed", confirmationMessage });
};

module.exports = {
  Confirmation_Message,
};
