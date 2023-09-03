const db = require('../data/database');
const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class Cart {
    constructor(items = [], cartTotalQuantity = 0, cartTotalPrice = 0) {
        this.items = items;
        this.cartTotalQuantity = +cartTotalQuantity;
        this.cartTotalPrice = +cartTotalPrice;
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

                    return;
                }
            }
        }

        this.cartTotalPrice += product.price;
        this.cartTotalQuantity++;
        this.items.push(cartItem);

    }

    updateItem(product, newItemTotalQuantity) {
        
        let isItemToDelete = false;
        let quantityDifference;
        
        let cartTotalQuantity = this.cartTotalQuantity;
        let cartTotalPrice = this.cartTotalPrice;
        let arrayIndex;
        let priceDifference;

        this.items.forEach(function (item, index) {
            
            arrayIndex = index;
            
            if (item.product.id === product.id && newItemTotalQuantity > 0) {
               
                if (newItemTotalQuantity > item.itemTotalQuantity) {
                    quantityDifference = +newItemTotalQuantity - +item.itemTotalQuantity;
                } else if (newItemTotalQuantity < item.itemTotalQuantity) {
                    quantityDifference = +newItemTotalQuantity - +item.itemTotalQuantity;
                } else {
                    return;
                }
                
                item.itemTotalQuantity = +newItemTotalQuantity;
                item.itemTotalPrice = +newItemTotalQuantity * +product.price;
                
                cartTotalQuantity += +quantityDifference;
                priceDifference = +quantityDifference * +product.price;
                cartTotalPrice += +priceDifference;
               
                
            } else if ((item.product.id === product.id && newItemTotalQuantity <= 0)) {
        
                isItemToDelete = true;
                cartTotalQuantity -= +item.itemTotalQuantity;
                priceDifference = +item.itemTotalQuantity * +product.price;
                cartTotalPrice -= +priceDifference;    
                
            }
            
        });
        
                this.cartTotalPrice = +cartTotalPrice;
                this.cartTotalQuantity = +cartTotalQuantity;
                
                if (isItemToDelete) {
                    this.items.splice(arrayIndex, 1);
                    return 0;
                }
                
                return this.items[arrayIndex].itemTotalPrice;

    }

}

module.exports = Cart;