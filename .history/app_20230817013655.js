const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth.routes');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
/**
 * Uso il metodo join della built-in library path di nodejs per costruire un path alla cartella views
 *  in modo tale che sia interpretabile da qualsiasi SO.
 */
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(authRoutes);

db.connectToDb().then(function () {
    app.listen(3000);
});