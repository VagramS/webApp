const express = require('express');
const logger = require('./app/Utils/client/logger.js');
const mongo = require('./app/Utils/db/Connection_mongoDB.js');

const app = express();
const PORT = process.env.PORT || 3001;

const { Admin_Router, Client_Router, Swagger_Router } = require('./app/routes/mainRouter.js');

// Admin router
app.use('/admin', Admin_Router);

// Client router
app.use('/client', Client_Router);

// Swagger router
app.use('/api-docs', Swagger_Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});