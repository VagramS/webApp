const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://webApp:webApp@cluster0.pb9s6te.mongodb.net/';
const client = new MongoClient(uri);

const Connection = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } 
    catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
};

module.exports = {
    client, 
    Connection
};