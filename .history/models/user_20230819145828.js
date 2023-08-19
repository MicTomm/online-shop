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

    async save() {

        const hashedPassword = await bcrypt.hash(this.password, 12);

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

    findByEmail(){

        const userDoc = db.getDb().collection('users').findOne({email: this.email});
        if(!userDoc){
            console.log('Error => Class: User(findByEmail()) - No user exists');
            return;
        }

        this.password = userDoc.password;
        this.fullName = userDoc.fullName;
        this.street = userDoc.address.street;
        this.city = userDoc.address.city;
        this.postaCode = userDoc.address.postaCode;
        this.id = userDoc._id;

        return userDoc;
    
    }

}

module.exports = User;