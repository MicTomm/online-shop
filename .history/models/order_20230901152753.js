const db = require('../data/database');

class Order {
    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        this.id = orderId;
    }


    // static transformOrderDocument(orderDoc) {
    //    
    //     return ;
    // }

    static transformOrderDocuments(orderDocs) {
        orderDocs.map(function (orderDoc) {
            new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc.id);
        });
       
        return orderDocs;
      }

    static async fetchAllForUser(userId) {
        const orderDocs = await db.getDb().collection('orders').find({ "userData.id": userId }).sort({id: -1}).toArray();
        
        return this.transformOrderDocuments(orderDocs);
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
                status: this.status,
                date: new Date()
            };
             
            return db.getDb().collection('orders').insertOne(orderDocument);
             
        }
    }
    
}

module.exports = Order;