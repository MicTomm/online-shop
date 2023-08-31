const Cart = require('../models/cart');

function initializeCart(req, res, next) {

    let cart;

    if (!req.session.cart) {
        /**
         * Per un utente (sia autenticato che non), che non ha ancora aggiunto nessun prodotto al carrello, non avrò in sessione (sul db)
         * l'oggetto cart, perché in base alle configurazioni date alla /config/session-config.js (cioè, 'resave: false' e 
         * 'saveUninitialized: false'), avrò salvataggio della sessione sul db, solo se si verifica un cambiamento, e dunque, 
         * solo se ho da salvare qualcosa a DB, in questo caso aggiungendo un nuovo oggetto al carrello.
         * 
         * Quindi, finché non aggiungo almeno un nuovo oggetto al carrello, questo verrà sempre inizializzato con array di items di
         * default vuoto, ma non salvato a db nella session.
         */
        console.log('NEW CART');
        cart = new Cart();
    } else {

        

        const sessionCartItem = req.session.cart;
        console.log('EXISTING CART');
        cart = new Cart(
            sessionCartItem.items,
            sessionCartItem.cartTotalQuantity,
            sessionCartItem.cartTotalPrice
        );
    }
    res.locals.cart = cart;
    next();
}

module.exports = {
    initializeCart: initializeCart
}