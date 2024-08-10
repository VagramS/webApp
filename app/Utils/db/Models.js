const mongoose = require("mongoose");
const mongo = require("./Connection_mongoDB.js");
const Schema = mongoose.Schema;

// Menu Categories
const MenuCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: String,
});
const MenuCategory = mongoose.model("MenuCategory", MenuCategorySchema);

// Meals
const MealSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  price: { type: Number, required: true },
  image_url: { type: String, default: null },
  category_id: { type: Number, ref: "MenuCategory", required: true },
  nutrition_info: { type: String, default: null },
  is_active: { type: Boolean, default: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: "Topping" }],
});
const Meal = mongoose.model("Meal", MealSchema);

// Toppings
const ToppingSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const Topping = mongoose.model("Topping", ToppingSchema);

// Orders
const OrderSchema = new Schema({
  order_id: { type: String, required: true, unique: true },
  table_id: { type: Number, required: true, ref: "Table" },
  order_items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
  total_cost: { type: Number, required: true },
  tip_amount: { type: Number, default: 0.0 },
  payment_status: String,
  order_status: { type: String, default: "Pending" },
  created_at: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);

// Order Items
const OrderItemSchema = new Schema({
  order_id: { type: Number, ref: "Order" },
  meal_id: { type: Number, ref: "Meal" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  comments: String,
  toppings: [{ type: Schema.Types.ObjectId, ref: "Topping" }],
});
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

// Cart
const CartSchema = new Schema({
  table_id: { type: Number, required: true, unique: true, ref: "Table" },
  cart_items: [
    {
      meal_id: {
        type: Number,
        ref: "Meal",
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
    },
  ],
  total_cost: { type: Number, required: true },
  tip_amount: { type: Number, default: 0.0 },
  comment: String,
  created_at: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", CartSchema);

// Cart Item
const CartItemSchema = new Schema({
  meal_id: { type: Number, ref: "Meal" },
  quantity: { type: Number, required: true },
  comment: String,
});
const CartItem = mongoose.model("CartItem", CartItemSchema);

// Admin Users
const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
});
const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

// Payments
const PaymentSchema = new Schema({
  order_id: { type: Number, ref: "Order" },
  payment_method: { type: String, required: true },
  payment_details: String,
  payment_status: String,
  paid_at: Date,
});
const Payment = mongoose.model("Payment", PaymentSchema);

// Tables
const TableSchema = new Schema({
  table_id: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  url: { type: String, required: true, unique: true },
  qr_code_url: { type: String, unique: true },
});
const Table = mongoose.model("Table", TableSchema);

async function addRecords() {
  mongo.connect();

  const cart = new Cart({
    table_id: "3",
    cart_items: [
      {
        meal_id: "4",
        quantity: "1",
        comments: "no comments",
      },
      {
        meal_id: "5",
        quantity: "2",
        comments: "no onins",
      },
    ],
    total_cost: "0.00",
    tip_amount: "2.00",
    comment: "no comments",
    created_at: Date.now(),
  });
  await cart.save();

  console.log("Records added");
}

async function dropTableCollection() {
  try {
    await mongo.connect();
    await CartItem.collection.drop();
    console.log("Table collection dropped");
  } catch (error) {
    console.error("Error dropping Table collection:", error);
  }
}
//dropTableCollection();

//addRecords().catch(console.error);

module.exports = {
  MenuCategory,
  Meal,
  Topping,
  Order,
  OrderItem,
  Cart,
  CartItem,
  AdminUser,
  Payment,
  Table,
};
