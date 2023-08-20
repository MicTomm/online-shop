const mongodbStore = require('connect-mongodb-session');

function getSessionStore(session) {
    const MongoDBStore = mongodbStore(session);
    const sessionStore = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return sessionStore;
}

function configSession(sessionStore){
    const sessionConfig = {
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    }

    return sessionConfig;
}

module.exports = {
    getSessionStore: getSessionStore,
    configSession: configSession
}