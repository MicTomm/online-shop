const mongodb = require('mongodb');
 
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
            itemTotalPrice: product.price 
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
        
        this.cartTotalPrice += product.price;
        this.cartTotalQuantity++;
        this.items.push(cartItem);

    }
}

module.exports = Cart;