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

                    console.log('ADD_TO_CART => this.cartTotalQuantity: ' + this.cartTotalQuantity);


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

        console.log('wewe');
        console.log(this.items);

        console.log('UPDATE => this.cartTotalPrice: ' + this.cartTotalPrice);
        console.log('UPDATE => this.cartTotalQuantity: ' + this.cartTotalQuantity);

        let isItemToDelete = false;
        let quantityDifference;

        let cartTotalQuantity = this.cartTotalQuantity;
        let cartTotalPrice = this.cartTotalPrice;

        this.items.forEach(function (item, index) {
            
            if (item.product.id === product.id && newItemTotalQuantity > 0) {

                console.log('--------------------------');
                console.log(item);
                quantityDifference = item.itemTotalQuantity - newItemTotalQuantity;
                item.itemTotalQuantity = newItemTotalQuantity;
                item.itemTotalPrice = newItemTotalQuantity * product.price;

                // console.log('INSIDE_FOREACH - UPDATE => this.cartTotalPrice: ' + this.cartTotalPrice);
                // console.log('INSIDE_FOREACH - UPDATE => this.cartTotalQuantity: ' + this.cartTotalQuantity);
            
                cartTotalQuantity += quantityDifference;
                cartTotalPrice = quantityDifference * product.price;
                
            } else if ((item.product.id === product.id && newItemTotalQuantity <= 0)) {
                this.items.splice(index, 1);
                cartTotalQuantity -= item.itemTotalQuantity;
                cartTotalPrice = item.itemTotalPrice * item.itemTotalQuantity;    
            }

        });
        
        // if (!isItemToDelete) {
            //     this.cartTotalQuantity += quantityDifference;
            //     this.cartTotalPrice = quantityDifference * product.price;
            // } else {
                //     this.cartTotalQuantity -= item.itemTotalQuantity;
                //     this.cartTotalPrice = item.itemTotalPrice * item.itemTotalQuantity;
                // }
                
                this.cartTotalPrice = cartTotalPrice;
                this.cartTotalQuantity = cartTotalQuantity;

                console.log('-------------' + this.cartTotalPrice);
                console.log('-------------' + this.cartTotalQuantity);
                //return item.itemTotalPrice;

    }

}

module.exports = Cart;