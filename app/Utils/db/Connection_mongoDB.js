const {MongoClient} = require('mongodb');
const fs = require('fs');

const uri = 'mongodb+srv://webApp:webApp@cluster0.pb9s6te.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
const jsonFilePath = 'app/Utils/db/webApp.json';

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("Could not connect to MongoDB", err);
    }
}

async function importDataToMongoDB() {
    try {
        // Read the JSON file
        const fileContent = fs.readFileSync(jsonFilePath);
        const data = JSON.parse(fileContent);
        
        const database = client.db(dbName);

        // Import each table's data into its own collection
        for (const [tableName, { data: tableData }] of Object.entries(data)) {
            const collection = database.collection(tableName);

            // If the collection has existing data, you might want to clear it first
            // await collection.deleteMany({});

            // Insert the data into the collection
            if (tableData.length > 0) {
                await collection.insertMany(tableData);
                console.log(`Data imported into collection: ${tableName}`);
            }
        }
    } catch (err) {
        console.error('Error during data import:', err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB.");
    }
}

//importDataToMongoDB();
//connectToMongoDB();

module.exports = {client};