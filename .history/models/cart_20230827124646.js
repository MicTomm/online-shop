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

    async addProductToCart(productId) {

        let prodId;

        try {
            prodId = new ObjectId(prodId)
        } catch (error) {
            error.code = 404;
            throw error;
        }
        
        let product;
        
        try {
            product = await db.getDb().collections('products').findOne(prodId);
        } catch (error) {
            console.log('ERROR - ');
            error.code = 404;
            throw error;
        }
        

        const cartItem = {
            product: product,
            itemTotalQuantity: 1,
            itemTotalPrice: product.price
        };

        for (const item of this.items) {
            if (item.id === product.id) {
                cartItem.itemTotalQuantity++;
                cartItem.itemTotalPrice += item.price;
                item = cartItem;

                this.cartTotalPrice += item.price;
                this.cartTotalQuantity++;

                return;
            }
        }

        this.cartTotalPrice += product.price;
        this.cartTotalQuantity++;
        this.items.push(cartItem);

    }
}

module.exports = Cart;