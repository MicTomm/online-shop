const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const authRoutes = require('./routes/auth.routes');
const db = require('./data/database');
const sessionConfig = require('./config/session-config');
const authMiddleware = require('./middlewares/auth-middleware');

const csrfTokenMiddleware = require('./middlewares/csrf-token-middleware');

const app = express();

const sessionStorage = sessionConfig.getSessionStore(session);
const sessionConfiguration = sessionConfig.configSession(sessionStorage);

app.set('view engine', 'ejs');
/**
 * Uso il metodo join della built-in library path di nodejs per costruire un path alla cartella views
 *  in modo tale che sia interpretabile da qualsiasi SO.
 */
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(session(sessionConfiguration));
app.use(csrf());

app.use(authMiddleware.auth);
app.use(csrfTokenMiddleware.getCsrfToken);

app.use(authRoutes);

app.use(function(error, req, res, next){
    res.status(500).render('500');
});

db.connectToDb().then(function () {
    app.listen(3000);
});