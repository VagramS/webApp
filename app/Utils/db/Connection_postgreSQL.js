const Client = require('pg');
    
const Client = new Client({
    user: 'postgres',
    host: "localhost",
    database: 'webApp',
    password: 'postgres',
    port: 5432,
});

const Connection = async() => {
    try {
        await Client.connect();
        console.log("Connected");
    } 
    catch (error) {
        console.error('Connection error', error.stack);
    }
}

module.exports = {
    Client, 
    Connection
};