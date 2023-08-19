const path = require('path');

const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/auth.routes');
const db = require('./data/database');
const sessionConfig = require('./config/session-config');

const app = express();

app.set('view engine', 'ejs');
/**
 * Uso il metodo join della built-in library path di nodejs per costruire un path alla cartella views
 *  in modo tale che sia interpretabile da qualsiasi SO.
 */
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded('views'));

const sessionStorage = sessionConfig.getSessionStore(session);
const sessionConfiguration = sessionConfig.configSession(sessionStorage);
app.use(session(sessionConfiguration));

app.use(authRoutes);

db.connectToDb().then(function () {
    app.listen(3000);
});