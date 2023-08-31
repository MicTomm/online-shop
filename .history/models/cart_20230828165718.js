const db = require('../data/database');
const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class Cart {
    constructor(items = [], cartTotalQuantity = 0, cartTotalPrice = 0) {
        this.items = items;
        this.cartTotalQuantity = cartTotalQuantity;
        this.cartTotalPrice = cartTotalPrice;
    }

    addProductToCart(product) {
        
        const cartItem = {
            product: product,
            itemTotalQuantity: 1,
            itemTotalPrice: product.price
        };

        for (const item of this.items) {


            console.log('item.id => ' + item.product.id);
            console.log('product.id => ' + product.id);

            if (item.id === product.id) {

                cartItem.itemTotalQuantity++;
                cartItem.itemTotalPrice += item.price;
                item = cartItem;
                
                this.cartTotalPrice += item.price;
                this.cartTotalQuantity++;
                
                //
                console.log('OGGETTO_GIÀ_IN_CARRELLO');

                return;
            }
        }

        //
        console.log('OGGETTO_NON_ANCORA_IN_CARRELLO');

        this.cartTotalPrice += product.price;
        this.cartTotalQuantity++;
        this.items.push(cartItem);

    }
}

module.exports = Cart;