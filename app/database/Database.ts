const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_CONNECT_STRING;
const dbName = 'Mathathon';

let db;

async function connectDB() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected successfully to database");
    } catch (err) {
        console.error("Could not connect to database", err);
    }
    return db;
}

export async function getDB() {
    if (!db) {
        await connectDB();
    }
    return db;
}

module.exports = { connectDB, getDB };
