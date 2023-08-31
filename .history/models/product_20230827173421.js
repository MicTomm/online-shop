const mongodb = require('mongodb');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; //con il + trasformo la String in Number
        this.description = productData.description;
        this.image = productData.image; //è il nome del file
        this.updateImageData();
        //l'id non viene valorizzato alla creazione di un oggetto ma solo quando lo si fetcha dal db
        if (productData._id) {
            this.id = productData._id.toString();
        }
    };

    updateImageData() {
        this.path = `product-data/images/${this.image}`;
        this.url = `/products/assets/images/${this.image}`;
    }

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

        //gestione caso updateImage
        if (this.id) {

            console.log('THIS_ID = ' + this.id);
            let productId;

            try {
                productId = new ObjectId(this.id);
                console.log('save() - OBJECT_ID: ');
                console.log(productId);
            } catch (error) {
                error.code = 404;
                throw error;
            }

            //caso in cui sto facendo updateImage ma qualcosa va storto col caricamento della nuova immagine. Non volendo sovrascrivere
            //quella pre-esistente, cancello la property image così che non venga sovrascritta su db
            if (!this.image) {
                delete productData.image;
            }

            await db.getDb().collection('products').updateOne({ _id: new ObjectId(productId) }, { $set: productData });

        } else {
            await db.getDb().collection('products').insertOne(productData);
        }

    }

    static async fetchById(productId) {

        let id;

        console.log('CLASS: Product - METHOD: fetchById() => ' + productId);

        try {
            id = new ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        const product = await db.getDb().collection('products').findOne({ _id: id });

        if (!product) {
            const error = new Error('Error - It was not possible to find that product!');
            //code non è una property di default, ma l'ho creata on-the-fly per avere un promemoria della tipologia dell'errore
            error.code = 404;

            throw error;
        }

        return new Product(product);
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    static deleteProduct(productId) {

        let id;

        try {
            id = new ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        //posso evitare di anteporre la keyword await alla query se faccio il return del risultato perché in questo modo gestisco
        //manualmente la promise. Nel controller, nella function che chiama questo metodo deleteProduct, devo comunque gestire con await
        return db.getDb().collection('products').deleteOne({ _id: id });
    }

}
module.exports = Product;