const express = require("express");
const helmet = require("helmet");
const mongoose = require("./app/Utils/db/Connection_mongoDB.js");
//const postgreSQL = require("./app/Utils/db/Connection_postgreSQL.js");
const ErrorHandlerMiddleware = require("./app/Utils/Middlewares/ErrorHandler.js");

const app = express();
const PORT = process.env.PORT || 3001;

const {
  Admin_Router,
  Client_Router,
  Swagger_Router,
} = require("./app/routes/mainRouter.js");

app.use(express.json());

// Enabling the Helmet middleware
app.use(helmet());

// Connect to MongoDB
mongoose.connect();

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Client router
app.use("/client", Client_Router);

// Admin router
app.use("/admin", Admin_Router);

// Swagger router
app.use("/api-docs", Swagger_Router);

// Error handling middleware
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
