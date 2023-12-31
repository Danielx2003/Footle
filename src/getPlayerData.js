const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://danielspicer:Scrappy2003@cluster0.qs66vcb.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const fs = require('fs');

async function getPlayers() {
    console.log("running")
    try {
        await client.connect();
        const db = client.db('footle');
        const collection = db.collection('players');
        // Find the first document in the collection
        const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
        fs.writeFile("tempData.js", JSON.stringify(result), (err) => {
            if (err) { throw err; }
        })
    } catch (err) {
        console.log(err)
    } finally {
        // Close the database connection when finished or an error occurs
        await client.close();
    }
}

getPlayers()