const mongoose = require('mongoose');
const mongo = require('./Connection_mongoDB');

const now = new Date();
const offset = now.getTimezoneOffset(); // Offset in minutes
const localTime = new Date(now.getTime() - offset * 60000); // Adjust to local time

const { Schema } = mongoose;

// Menu Categories
const MenuCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: String,
}, { versionKey: false }); // Disable __v

const MenuCategory = mongoose.model('MenuCategory', MenuCategorySchema);

// Meals
const MealSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  price: { type: Number, required: true },
  image_url: { type: String, default: null },
  category_id: { type: Number, ref: 'MenuCategory', required: true },
  nutrition_info: { type: String, default: null },
  is_avaliable: { type: Boolean, default: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }],
}, { versionKey: false });

const Meal = mongoose.model('Meal', MealSchema);

// Toppings
const ToppingSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { versionKey: false });

const Topping = mongoose.model('Topping', ToppingSchema);

// Orders
const OrderSchema = new Schema({
  order_id: { type: Number, required: true, unique: true },
  table_id: { type: Number, required: true, ref: 'Table' },
  order_items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  total_cost: { type: Number, required: true },
  tip_amount: { type: Number, default: 0.00 },
  order_status: { type: String, default: 'Pending' },
  email: { type: String, required: true },
  created_at: { type: Date, default: localTime },
}, { versionKey: false });

const Order = mongoose.model('Order', OrderSchema);

// Order Items
const OrderItemSchema = new Schema({
  order_id: { type: Number, ref: 'Order' },
  meal_id: { type: Number, ref: 'Meal' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }],
}, { versionKey: false });

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

// Cart
const CartSchema = new Schema({
  table_id: {
    type: Number, required: true, unique: true, ref: 'Table',
  },
  cart_items: [{
    meal_id: {
      type: Number,
      ref: 'Meal',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
  }],
  total_cost: { type: Number, required: true },
  tip_amount: { type: Number, default: 0.00 },
  comment: String,
  created_at: { type: Date, default: localTime },
}, { versionKey: false });

const Cart = mongoose.model('Cart', CartSchema);

// Admin Users
const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  created_at: { type: Date, default: localTime },
}, { versionKey: false });

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

// Tables
const TableSchema = new Schema({
  table_id: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  is_avaliable: { type: Boolean, default: true },
  url: { type: String, required: true, unique: true },
  qr_code_url: { type: String, unique: true },
}, { versionKey: false });

const Table = mongoose.model('Table', TableSchema);

// For testing
async function addRecords() {
  await mongo.connect();

  const order = new Order({
    order_id: 8,
    table_id: 4, 
    order_items: [],
    total_cost: 20,
    tip_amount: 3.00,
    order_status: 'Pending',
    email:'vagramsaakyan02@gmail.com',
  });

  await order.save();

  console.log('Order and related records added');
}

// addRecords().catch(console.error);

module.exports = {
  MenuCategory,
  Meal,
  Topping,
  Order,
  OrderItem,
  Cart,
  AdminUser,
  Table,
};
