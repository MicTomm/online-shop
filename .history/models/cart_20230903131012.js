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
                console.log('cartTotalQuantity: ' + cartTotalQuantity);
                console.log(typeof cartTotalQuantity);
                priceDifference = +quantityDifference * +product.price;
                console.log('priceDifference: ' + priceDifference);
                cartTotalPrice += +priceDifference;
                console.log('cartTotalPrice: ' + cartTotalPrice);

            } else if ((item.product.id === product.id && newItemTotalQuantity <= 0)) {

                isItemToDelete = true;
                cartTotalQuantity -= +item.itemTotalQuantity;
                priceDifference = +item.itemTotalQuantity * +product.price;
                cartTotalPrice -= +priceDifference;

            }

        });

        this.cartTotalPrice = +cartTotalPrice;
        this.cartTotalQuantity = +cartTotalQuantity;
        console.log('-------------' + this.cartTotalPrice);
        console.log('-------------' + this.cartTotalQuantity);

        if (isItemToDelete) {
            this.items.splice(arrayIndex, 1);
            return 0;
        }

        console.log('this.items[arrayIndex].itemTotalPrice => ' + this.items[arrayIndex].itemTotalPrice);
        return this.items[arrayIndex].itemTotalPrice;

    }

    async updatePrices() {
            //recupero id prodotti nel carrello utente da session.cart
            const itemIds = this.items.map(function (item) {
                return item.product.id;
            });

            //recupero quei prodotti da db
            const retrievedProducts = await Product.fetchMultipleProducts(itemIds);

            const productsToRemoveFromCart = [];

            //confronto prodotto nel session.cart con prodotto stored in collection 'products' nel db
            for (const cartItem of this.items) {
                const product = retrievedProducts.find(function (prod) {
                    return cartItem.product.id === prod.id;
                });

                if (!product) {
                    //il prodotto è stato eleminato da db e va eliminato dal carrello utente
                    productsToRemoveFromCart.push(cartItem.product.id);
                    continue; //passo al ciclo successivo senza eseguire il resto del codice nel for
                }

                //il prodotto non è stato eliminato. Lo aggiorno con gli ultimi dati (prezzo, ecc) recuperati da db
                cartItem.product = product;
                cartItem.cartTotalPrice = cartItem.itemTotalQuantity * product.price;

            }

            //se esistono, rimuovo gli elementi di productsToRemoveFromCart dal carrello
            if (productsToRemoveFromCart > 0) {
                this.items = this.items.filter(function (item) {
                    return productsToRemoveFromCart.indexOf(item.product.id) < 0; //return 1 se lo trova, -1 se non lo trova
                });
            }

            //ricalcolo qtà e prezzo totale del carrello
            this.cartTotalQuantity = 0;
            this.cartTotalPrice = 0;

            for (const item of this.items) {

                this.cartTotalQuantity += item.itemTotalQuantity;
                this.cartTotalPrice += item.itemTotalPrice;
            }

        }
    }


module.exports = Cart;