const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

const db = require('../data/database');
const modelUtils = require('../util/model-utils');

class User {
    constructor(email, password, fullName, street, city, postalCode, id) {
        this.email = email,
            this.password = password,
            this.fullName = fullName,
            this.street = street,
            this.city = city,
            this.postalCode = postalCode
            
        if (id) {
            this.id = modelUtils.convertIntoObjectid(id); 
        }
            
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

    async fetchById(){
        return await db.getDb().collection('users').findOne({_id: this.id});
    }

    async findByEmail(){

        const userDoc = await db.getDb().collection('users').findOne({email: this.email});
        
        if(!userDoc){
            console.log('Error => Class: User(findByEmail()) - No user exists');
            return;
        }

        this.password = userDoc.password;
        this.fullName = userDoc.fullName;
        this.street = userDoc.address.street;
        this.city = userDoc.address.city;
        this.postalCode = userDoc.address.postalCode;
        this.id = userDoc._id;

        return userDoc;
    
    }

}

module.exports = User;