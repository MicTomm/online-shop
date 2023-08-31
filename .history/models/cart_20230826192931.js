class Cart {
    constructor(items = []) {
        this.items = items;
    }

    addProductToCart(itemId) {

        const cartItem = {
            id: itemId,
            quantity: 1,
            totalPrice: 0 
        };

        for (const item of this.items) {
            if (item.id === itemId) {
                cartItem.quantity += 1;
                cartItem.totalPrice += item.price;
            }
        }

    }
}

module.exports = Cart;