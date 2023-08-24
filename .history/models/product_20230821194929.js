const db = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; //con il + trasformo la String in Number
        this.description = productData.description;
        this.image = productData.image; //è il nome del file
        this.path = `product-data/images/${this.image}`;
        this.url = `/products/assets/images/${this.image}`;
    };

    static async fetchAll() {

        const productDocument = await db.getDb().collection('products').find().toArray();
        productDocument.map(function (productData) {
            return new Product(productData);
        });
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };

        const result = await db.getDb().collection('products').insertOne(productData);
    }

}

module.exports = Product;