const express = require('express');
const logger = require('./app/Utils/client/logger.js');
const mongoose = require('./app/Utils/db/Connection_mongoDB.js');
const postgreSQL = require('./app/Utils/db/Connection_postgreSQL.js');
const ErrorHandlerMiddleware = require('./app/Utils/Middlewares/ErrorHandler.js');

const app = express();
const PORT = process.env.PORT || 3001;

const { Admin_Router, Client_Router, Swagger_Router } = require('./app/routes/mainRouter.js');

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