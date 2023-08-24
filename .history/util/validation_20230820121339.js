const User = require('../models/user');

function validateSignupInputFields(enteredEmail, enteredConfirmEmail, enteredPassword, enteredFullName,
    enteredStreet, enteredCity, enteredPostalCode) {
    return (enteredEmail && enteredConfirmEmail && enteredPassword && enteredFullName &&
        enteredStreet && enteredCity && enteredPostalCode &&
        enteredEmail.trim() !== '' && enteredConfirmEmail.trim() !== '' &&
        enteredPassword.trim() !== '' && enteredFullName.trim() !== '' &&
        enteredStreet.trim() !== '' && enteredCity !== '' && enteredPostalCode !== '' &&
        enteredEmail === enteredConfirmEmail && enteredEmail.includes('@') &&
        enteredPassword.trim().length >= 6);
}

async function checkIfUserAlreadyExists(user){
    // const user = new User(email);
    const alreadyExists = await user.findByEmail();
    
    if(!alreadyExists){
        return false;
    }

    return true;
}

module.exports = {
    validateSignupInputFields: validateSignupInputFields,
    checkIfUserAlreadyExists: checkIfUserAlreadyExists
}