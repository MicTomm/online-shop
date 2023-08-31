const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const adminRoutes = require('./routes/admin.routes');

const db = require('./data/database');
const sessionConfig = require('./config/session-config');

const authMiddleware = require('./middlewares/auth-middleware');
const errorsHandlerMiddleware = require('./middlewares/errors-handler-middleware');
const csrfTokenMiddleware = require('./middlewares/csrf-token-middleware');
const protectRoutesMiddleware = require('./middlewares/protect-routes-middlware');
const initializeCartMiddleware = require('./middlewares/initialize-cart-middleware');
const { error } = require('console');

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
//imposto il filtro per l'url delle uploaded-product-images. Rendendo static anche la cartella product-data, posso servire le immagini dei prodotti 
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({extended: false}));

app.use(session(sessionConfiguration));
app.use(csrf());

app.use(authMiddleware.auth);
app.use(csrfTokenMiddleware.getCsrfToken);
app.use(initializeCartMiddleware.initializeCart);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(cartRoutes);

app.use(protectRoutesMiddleware.protectRoutes);
app.use('/admin', adminRoutes);

//app.use(errorsHandlerMiddleware.errorsHandler);

db.connectToDb()
.then(function () {
    app.listen(3000);
})
.catch(function(error){
    console.log('Failed to connect to DB');
    throw error;
});