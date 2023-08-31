const db = require('../data/database');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
 
class Cart {
    constructor(items = []) {
        this.items = items;
        this.cartTotalQuantity;
        this.cartTotalPrice;
    }

    async addProductToCart(product) {
        
        const cartItem = {
            product: product,
            itemTotalQuantity: 1,
            itemTotalPrice: retrievedItemDoc.price 
        };

        for (const item of this.items) {
            if (item.id === product.id) {
                cartItem.itemTotalQuantity ++;
                cartItem.itemTotalPrice += item.price;
                item = cartItem;

                this.cartTotalPrice += item.price;
                this.cartTotalQuantity++;
            
                return;
            }
        }
        
        this.cartTotalPrice += retrievedItemDoc.price;
        this.cartTotalQuantity++;
        this.items.push(cartItem);

    }
}

module.exports = Cart;