const schemas = require('../../../utils/db/Models');
const { NotFoundError } = require('../../../utils/Errors/index');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // Replace with your Mailtrap username
    pass: process.env.EMAIL_PASS, // Replace with your Mailtrap password
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificates
  }
});

const Confirmation_Message = async (req, res) => {
  // #swagger.tags = ['Client / Order']
  // #swagger.description = 'Display a confirmation message to the client after a successful payment.'
  // #swagger.summary = 'Display a confirmation message'
  // #swagger.security = []

  const order_id = req.params.orderid;
  const order = await schemas.Order.findOne({ order_id });

  if (!order)
    throw new NotFoundError('Not Found Error', 'Order not found');

  const ConfirmationMessage = `Order number: ${order.order_id}, Total cost: ${order.total_cost}$, Tip amount: ${order.tip_amount}, Table number: ${order.table_id}`;

  res.status(200).send({ message: 'Payment confirmed', ConfirmationMessage });
};

const Payment = async (req, res) => {
  // #swagger.tags = ['Client / Order']
  // #swagger.description = 'Process the payment for the order.'
  // #swagger.summary = 'Process the payment'
  // #swagger.security = []

  try {
    const order_id = req.params.orderid;
    const order = await schemas.Order.findOne({ order_id });
  
    if (!order)
      throw new NotFoundError('Not Found Error', 'Order not found');
    
    order.order_status = 'Paid';
    await order.save();
  
    const ConfirmationMessage = `
      Order number: ${order.order_id}
      Total cost: ${order.total_cost}$
      Tip amount: ${order.tip_amount}$
      Table number: ${order.table_id}
      Status: Paid`;

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: order.email, 
      subject: 'Order Confirmation',
      text: `Your order has been confirmed!\n\n${ConfirmationMessage}\n\nThank you for your order!`
    };

    // Send email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).send({ message: 'Payment processed, but failed to send confirmation email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Payment processed successfully, confirmation email sent', order });
      }
    });
  }
  catch (error) {
    res.status(500).send({ message: 'Payment processing failed', error });
  }
}

module.exports = {
  Confirmation_Message,
  Payment,
};
