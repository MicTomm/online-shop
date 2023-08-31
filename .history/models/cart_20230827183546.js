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

        //let prodId;

        // try {
        //     prodId = new ObjectId(productId)
        // } catch (error) {
        //     error.code = 404;
        //     throw error;
        // }
        
        console.log('CLASS: Cart - METHOD: addProductToCart() => ' + product);

        //let product;
        
        // try {
        //    // product = await Product.fetchById(productId);
        //    product =  await db.getDb().collection('products').findOne({_id: new ObjectId(productId)});
        // } catch (error) {
        //     console.log('ERROR - Cart Class - addProductToCart -> fetchById()');
        //     error.code = 404;
        //     throw error;
        // }

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