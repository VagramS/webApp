const { Client } = require('pg');
const fs = require('fs');
const dbFile = 'app/Utils/db/webApp.json';
    
const client = new Client({
    user: 'postgres',
    host: "localhost",
    database: 'webApp',
    password: 'postgres',
    port: 5432,
});

function connectToPostgreSQL() {
    client.connect(function(err) {
        if(err) 
            console.error('Connection error', err.stack);
        else
            console.log("Connected to postgreSQL");
    });
}

// Create the database file if it does not exist
async function createDatabaseFile() {
    try {
        fs.writeFileSync(dbFile, JSON.stringify([]));
        console.log('Database file created successfully.')
    } 
    catch (err) {
        console.error('Error creating database file:', err);
    }
};

// Queries for each table in the database
const tables = [
    'menu_categories',
    'meals',
    'toppings',
    'orders',
    'order_items',
    'order_item_toppings',
    'cart',
    'cart_items',
    'cart_item_toppings',
    'admin_users',
    'payments',
    'tables',
];

// Function to fetch table data and schema
async function fetchTableData(tableName) {
    const dataQuery = `SELECT * FROM ${tableName}`;
    const schemaQuery = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}'`;

    const data = await client.query(dataQuery);
    const schema = await client.query(schemaQuery);

    return {
        [tableName]: {
            schema: schema.rows,
            data: data.rows,
        },
    };
}

// Function to fetch all data from the database
async function fetchData() {
    createDatabaseFile();
    try {
        const results = await Promise.all(
            tables.map(tableName => fetchTableData(tableName))
        );

        const dbData = results.reduce((acc, next) => ({ ...acc, ...next }), {});

        fs.writeFileSync(dbFile, JSON.stringify(dbData, null, 2));
        console.log('Database data with schema has been written to JSON file successfully.');
    } catch (err) {
        console.error('Error executing queries or writing data:', err);
    } finally {
        await client.end();
        console.log("Disconnected from database.");
    }
}

//fetchData();
//connectToPostgreSQL();

module.exports = {client};