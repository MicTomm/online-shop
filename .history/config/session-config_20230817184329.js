const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function getSessionStore() {
    const MongoDBStore = mongodbStore.MongoDBStore;
    const sessionStorage = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });
}