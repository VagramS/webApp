const mongoose = require("mongoose");
const mongo = require('./Connection_mongoDB.js'); 
const Schema = mongoose.Schema;

// Menu Categories
const MenuCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: String
});
const MenuCategory = mongoose.model('MenuCategory', MenuCategorySchema);


// Meals
const MealSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  name: { type: String, required: true },
  description: { type: String, default: null },
  price: { type: Number, required: true },
  image_url: { type: String, default: null },
  category_id: { type: Number, ref: 'MenuCategory', required: true},
  nutrition_info: { type: String, default: null },
  is_active: { type: Boolean, default: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping'}]
});
const Meal = mongoose.model('Meal', MealSchema);


// Toppings
const ToppingSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});
const Topping = mongoose.model('Topping', ToppingSchema);


// Orders
const OrderSchema = new Schema({
  order_id: { type: String, required: true, unique: true },
  table_id: Number,
  order_items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  total_cost: { type: Number, required: true },
  tip: { type: Number, default: 0.00 },
  payment_status: String,
  order_status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);


// Order Items
const OrderItemSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
  meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }]
});
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);


// Cart
const CartSchema = new Schema({
  cart_id: { type: Number, required: true, unique: true },
  session_id: { type: String, unique: true },
  created_at: { type: Date, default: Date.now }
});
const Cart = mongoose.model('Cart', CartSchema);


// Cart Items
const CartItemsSchema = new Schema({
  cart_id: { type: Schema.Types.ObjectId, ref: 'Cart' },
  meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
  quantity: { type: Number, required: true },
  added_at: { type: Date, default: Date.now },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }]
});
const CartItems = mongoose.model('CartItems', CartItemsSchema);


// Admin Users
const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: {type: String, default: null},
  created_at: { type: Date, default: Date.now },
});
const AdminUser = mongoose.model('AdminUser', AdminUserSchema);


// Payments
const PaymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
  payment_method: { type: String, required: true },
  payment_details: Schema.Types.Mixed,
  paid_at: Date,
  payment_status: String
});
const Payment = mongoose.model('Payment', PaymentSchema);


// Tables
const TableSchema = new Schema({
  table_number: { type: Number, required: true, unique: true },
  qr_code_url: String
});
const Table = mongoose.model('Table', TableSchema);


async function addRecords() {
  mongo.connect();

  const order = new Order({
    order_id: 9,
    table_id: 7,
    order_items: [],
    total_cost: 10.00,
    tip: 0.00,
    payment_status: 'Paid',
    order_status: 'Pending',
  });
  await order.save();
  
  console.log('Records added');
}

//addRecords().catch(console.error);

module.exports = {
  MenuCategory,
  Meal,
  Topping,
  Order,
  OrderItem,
  Cart,
  CartItems,
  AdminUser,
  Payment,
  Table
}
