const express = require('express');
const logger = require('./app/Utils/client/logger.js');

const app = express();
const PORT = process.env.PORT || 3001;

const { Admin_Router } = require('./app/routes/admin/router.js');
const { Client_Router } = require('./app/routes/client/router.js');

// Admin router
app.use('/admin', Admin_Router);

// Client router
app.use('/client', Client_Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});