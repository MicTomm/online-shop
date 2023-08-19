const db = require('../data/database');

class User {
    constructor(email, password, fullName, street, city, postalCode, id){
        this.email = email,
        this.password = password,
        this.fullName = fullName,
        this.street = street,
        this.city = city,
        this.postalCode = postalCode,
        this.id = id 
    }

    save(){

        

        db.getDb().collection('users').insertOne({
            email: this.email,
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