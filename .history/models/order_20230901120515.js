const db = require('../data/database');

class Order {
    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('it-IT', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        this.id = orderId;
    }


    static transformOrderDocument(orderDoc) {
        return new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc.id);
    }

    static transformOrderDocuments(orderDocs) {
        return this.transformOrderDocument(orderDocs);
    }

    static fetchAllForUser(userId) {
        const orders = db.getDb().collection('orders').find({ "userData.id": userId }).sort({id: -1}).toArray();
        orders.map(this.transformOrderDocuments(orders));
    }

    save() {
        if (this.id) {
            const orderId = new mongodb.ObjectId(this.id);
            return db
                .getDb()
                .collection('orders')
                .updateOne({ _id: orderId }, { $set: { status: this.status } });
        } else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };
             
            return db.getDb().collection('orders').insertOne(orderDocument);
             
        }
    }
    
}

module.exports = Order;