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
        
        const products = await db.getDb().collection('products').find().toArray();
        /**
         * map() è un built-in method di js applicabile agli array che consente di ritrasformare i singoli elementi dell'array.
         * productDocument è automaticamente inteso come uno degli elementi dell'array 'products' (dunque, un oggetto productData salvato su db).
         * Essendo che sul db non ho salvato le proprietà 'path' ed 'url' dell'oggetto 'productData', ho bisogno che al momento che faccio 
         * il fetch di ogni singolo document (oggetto salvato su db) della collection product, questa venga rimappata in un product Object 
         * in modo tale da avere a disposizione le proprietà 'path' e 'url'
         */
        return products.map(function (productDocument) {
            return new Product(productDocument);
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