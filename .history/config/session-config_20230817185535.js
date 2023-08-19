const mongodbStore = require('connect-mongodb-session');

function getSessionStore() {
    const MongoDBStore = mongodbStore(session);
    const sessionStorage = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return sessionStorage;
}

function configSession(sessionStore){
    const sessionConfig = {
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
        sessionStorage: sessionStore,
    }

    return sessionConfig;
}

module.exports = {
    getSessionStore: getSessionStore,
    configSession: configSession
}