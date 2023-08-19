const bcrypt = require('bcrypt');

const db = require('../data/database');

class User {
    constructor(email, password, fullName, street, city, postalCode, id) {
        this.email = email,
            this.password = password,
            this.fullName = fullName,
            this.street = street,
            this.city = city,
            this.postalCode = postalCode,
            this.id = id
    }

    save() {

        const hashedPassword = bcrypt.hash(this.password, 12);

        db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullName: this.fullName,
            address: {
                street: this.street,
                city: this.city,
                postalCode: this.postalCode
            }
        });
    }
}

module.exports = User;