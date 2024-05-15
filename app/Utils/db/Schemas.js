const mongoose = require('mongoose');
const { Schema } = mongoose;

// Menu Categories
const menuCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

// Meals
const mealSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image_url: String,
  category_id: { type: Schema.Types.ObjectId, ref: 'MenuCategory' },
  tag: String,
  nutrition_info: Schema.Types.Mixed,
  is_active: { type: Boolean, default: true }
});

// Toppings
const toppingSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Orders
const orderSchema = new Schema({
  order_number: { type: String, required: true, unique: true },
  total_cost: { type: Number, required: true },
  tip: { type: Number, default: 0.00 },
  table_number: Number,
  payment_status: String,
  created_at: { type: Date, default: Date.now }
});

// Order Items
const orderItemSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
  meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }]
});

// Cart
const cartSchema = new Schema({
  user_id: Number,
  session_id: { type: String, unique: true },
  created_at: { type: Date, default: Date.now }
});

// Cart Items
const cartItemSchema = new Schema({
  cart_id: { type: Schema.Types.ObjectId, ref: 'Cart' },
  meal_id: { type: Schema.Types.ObjectId, ref: 'Meal' },
  quantity: { type: Number, required: true },
  added_at: { type: Date, default: Date.now },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }]
});

// Admin Users
const adminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  last_login: Date
});

// Payments
const paymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
  payment_method: { type: String, required: true },
  payment_details: Schema.Types.Mixed,
  paid_at: Date,
  payment_status: String
});

// Tables
const tableSchema = new Schema({
  table_number: { type: Number, required: true, unique: true },
  qr_code_url: String
});

// Model exports
mongoose.model('MenuCategory', menuCategorySchema);
mongoose.model('Meal', mealSchema);
mongoose.model('Toppings', toppingSchema);
mongoose.model('Order', orderSchema);
mongoose.model('OrderItem', orderItemSchema);
mongoose.model('Cart', cartSchema);
mongoose.model('CartItem', cartItemSchema);
mongoose.model('AdminUser', adminUserSchema);
mongoose.model('Payment', paymentSchema);
mongoose.model('Table', tableSchema);

module.exports = {
    menuCategory: mongoose.model('MenuCategory'),
    meal: mongoose.model('Meal'),
    toppings: mongoose.model('Toppings'),
    order: mongoose.model('Order'),
    orderItem: mongoose.model('OrderItem'),
    cart: mongoose.model('Cart'),
    cartItem: mongoose.model('CartItem'),
    adminUser: mongoose.model('AdminUser'),
    payment: mongoose.model('Payment'),
    table: mongoose.model('Table')
};
