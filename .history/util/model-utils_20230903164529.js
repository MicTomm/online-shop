const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

function convertIntoObjectid(id){

    let objectId;
    
    try {
        objectId = new ObjectId(id);
    } catch (error) {
        error.cod = 404;
        throw error;
    }

    return objectId;
}

module.exports = {
    convertIntoObjectid: convertIntoObjectid
}