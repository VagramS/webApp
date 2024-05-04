const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const { Admin_Router } = require('./app/routes/admin/router.js');
const { Client_Router } = require('./app/routes/client/router.js');
const {DB_Router} = require('./app/Utils/db/router.js');

// Admin router
app.use('/admin', Admin_Router);

// Client router
app.use('/client', Client_Router);

// Database router
app.use('/DB', DB_Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});