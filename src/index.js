const express = require('express');
const mongoose = require('../app/utils/db/Connection_mongoDB');
const ErrorHandlerMiddleware = require('../app/utils/Middlewares/ErrorHandler');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3001;

const { Admin_Router, Client_Router, Swagger_Router } = require('../app/routes/mainRouter');

app.use(express.json());

// Connect to MongoDB
mongoose.connect();

// Client router
app.use('/client', Client_Router);

// Admin router
app.use('/admin', Admin_Router);

// Swagger router
app.use('/api-docs', Swagger_Router);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

module.exports = app;
