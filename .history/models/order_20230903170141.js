const mongodb = require('mongodb');
const db = require('../data/database');
const modelUtil = require('../util/model-utils');

const ObjectId = mongodb.ObjectId;

class Order {
    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        this.formattedDate = '';
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
    //     return new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc.id);

    // }

    // static transformOrderDocuments(orderDocs) {
    //     return orderDocs.map(this.transformOrderDocument);

    // }

    static async fetchById(orderId) {

        const id = modelUtil.convertIntoObjectid(orderId);

        return await db.getDb().collection('orders').findOne({_id: id});

    }

    static async fetchAll() {
        const orders = await db.getDb().collection('orders').find().toArray();

        return orders.map(function (orderDoc) {
            return new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc._id.toString());
        });
    }

    static async fetchAllForUser(userId) {
        const orderDocs = await db.getDb().collection('orders').find({ "userData.id": userId }).sort({ date: -1 }).toArray();

        // return this.transformOrderDocuments(orderDocs);

        return orderDocs.map(function (orderDoc) {
            return new Order(orderDoc.productData, orderDoc.userData, orderDoc.status, orderDoc.date, orderDoc._id.toString());
        });
    }

    static async updateOrderStatus(orderId, newStatus) {

        let id;

        try {
            id = new ObjectId(orderId);
        } catch (error) {
            error.cod = 404;
            throw error;
        }

        await db.getDb().collection('orders').updateOne({ _id: id }, { $set: { status: newStatus } });

    }

    save() {
        // if (this.id) {
        //     const orderId = new mongodb.ObjectId(this.id);
        //     return db
        //         .getDb()
        //         .collection('orders')
        //         .updateOne({ _id: orderId }, { $set: { status: this.status } });
        // } else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                status: this.status,
                date: new Date()
            };

            return db.getDb().collection('orders').insertOne(orderDocument);

        }
    }

//}

module.exports = Order;