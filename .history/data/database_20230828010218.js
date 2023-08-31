const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient; 

let db;

async function connectToDb(){
    const dbConnection = await MongoClient.connect('mongodb://127.0.0.1:27017');
    db = dbConnection.db('online-shop');
}

function getDb(){
    if (!db) {
        throw {message: 'That was no possible connect to the db'}
    }

    return db;
}

module.exports = {
    connectToDb: connectToDb,
    getDb: getDb
}