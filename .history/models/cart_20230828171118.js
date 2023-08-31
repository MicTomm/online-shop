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

        if (this.items.length !== 0 && this.items) {
            for (let item of this.items) {

                if (item.product.id === product.id) {

                    cartItem.itemTotalQuantity++;
                    cartItem.itemTotalPrice += item.price;

                    console.log('cartItem.itemTotalQuantity => ' + cartItem.itemTotalQuantity);
                    console.log('cartItem.itemTotalPrice => ' + cartItem.itemTotalPrice);

                    item = cartItem;

                    this.cartTotalPrice += item.price;
                    this.cartTotalQuantity++;

                    //
                    console.log('OGGETTO_GIÀ_IN_CARRELLO');

                    return;
                }
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