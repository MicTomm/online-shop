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
            for (const item of this.items) {

                if (item.product.id === product.id) {

                    item.itemTotalQuantity++;
                    item.itemTotalPrice += item.product.price;

                    this.cartTotalPrice += item.product.price;
                    this.cartTotalQuantity++;

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

    updateItem(product, newItemTotalQuantity) {

        this.items.forEach(function (item, index) {

            if (item.product.id === product.id && newItemTotalQuantity > 0) {
                const quantityDifference = item.itemTotalQuantity - newItemTotalQuantity;
                item.itemTotalQuantity = newItemTotalQuantity;
                item.itemTotalPrice = newItemTotalQuantity * product.price;

                this.cartTotalQuantity += quantityDifference;
                this.cartTotalPrice = quantityDifference * product.price;
            } else if ((item.product.id === product.id && newItemTotalQuantity <= 0)) {
                this.items.splice(index, 1);
                this.cartTotalQuantity -= item.itemTotalQuantity;
                this.cartTotalPrice = item.itemTotalPrice * item.itemTotalQuantity;
            }
            return item.itemTotalPrice;
        });

    }

}

module.exports = Cart;