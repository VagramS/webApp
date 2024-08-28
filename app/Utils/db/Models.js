const mongoose = require('mongoose');

const mongo = require('./Connection_mongoDB');

const { Schema } = mongoose;

// Menu Categories
const MenuCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: String,
});
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
});
const Meal = mongoose.model('Meal', MealSchema);

// Toppings
const ToppingSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const Topping = mongoose.model('Topping', ToppingSchema);

// Orders
const OrderSchema = new Schema({
  order_id: { type: Number, required: true, unique: true },
  table_id: { type: Number, required: true, ref: 'Table' },
  order_items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  total_cost: { type: Number, required: true },
  tip_amount: { type: Number, default: 0.00 },
  order_status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);

// Order Items
const OrderItemSchema = new Schema({
  order_id: { type: Number, ref: 'Order' },
  meal_id: { type: Number, ref: 'Meal' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: 'Topping' }],
});
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
  created_at: { type: Date, default: Date.now },
});
const Cart = mongoose.model('Cart', CartSchema);

// Admin Users
const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});
const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

// Tables
const TableSchema = new Schema({
  table_id: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  url: { type: String, required: true, unique: true },
  qr_code_url: { type: String, unique: true },
});
const Table = mongoose.model('Table', TableSchema);

async function addRecords() {
  await mongo.connect();

  // Example Toppings
  const topping1 = new Topping({
    id: 1,
    name: 'Extra Cheese',
    price: 1.50,
  });

  const topping2 = new Topping({
    id: 2,
    name: 'Pepperoni',
    price: 2.00,
  });

  await topping1.save();
  await topping2.save();

  // Example Meals
  const meal1 = new Meal({
    id: 4,
    name: 'Cheese Pizza',
    description: 'A delicious cheese pizza.',
    price: 8.99,
    category_id: 1, // Assuming you have a category with id 1
  });

  const meal2 = new Meal({
    id: 5,
    name: 'Pepperoni Pizza',
    description: 'A spicy pepperoni pizza.',
    price: 10.99,
    category_id: 1, // Assuming you have a category with id 1
  });

  await meal1.save();
  await meal2.save();

  // Example Order Items
  const orderItem1 = new OrderItem({
    meal_id: meal1.id,
    quantity: 1,
    price: meal1.price,
    comments: 'No additional toppings',
    toppings: [topping1._id], // Extra Cheese
  });

  const orderItem2 = new OrderItem({
    meal_id: meal2.id,
    quantity: 2,
    price: meal2.price,
    comments: 'No onions, add pepperoni',
    toppings: [topping2._id], // Pepperoni
  });

  await orderItem1.save();
  await orderItem2.save();

  // Example Order
  const order = new Order({
    order_id: 1,
    table_id: 3, // Assuming you have a table with id 3
    order_items: [orderItem1._id, orderItem2._id],
    total_cost: orderItem1.price * orderItem1.quantity + orderItem2.price * orderItem2.quantity,
    tip_amount: 2.00,
    order_status: 'Pending',
    created_at: Date.now(),
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
