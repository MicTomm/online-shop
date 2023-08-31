const db = require('../data/database');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
 
class Cart {
    constructor(items = []) {
        this.items = items;
    }

    async addProductToCart(itemId) {

        const cartItem = {
            id: itemId,
            quantity: 1,
            totalPrice: 0 
        };

        const id = new ObjectId(itemId);

        for (const item of this.items) {
            if (item.id === itemId) {
                cartItem.quantity += 1;
                cartItem.totalPrice += item.price;
            }
        }

        const retrievedItem = await db.getDb().collections('products').findOne();

    }
}

module.exports = Cart;