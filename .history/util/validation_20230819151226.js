const bcrypt = require('bcrypt');

function validateSignupInputFields(enteredEmail, enteredConfirmEmail, enteredPassword, enteredFullName,
    enteredStreet, enteredCity, enteredPostalCode) {
    return (enteredEmail && enteredConfirmEmail && enteredPassword && enteredFullName &&
        enteredStreet && enteredCity && enteredPostalCode &&
        enteredEmail.trim() !== '' && enteredConfirmEmail.trim() !== '' &&
        enteredPassword.trim() !== '' && enteredFullName.trim() !== '' &&
        enteredStreet.trim() !== '' && enteredCity !== '' && enteredPostalCode !== '' &&
        enteredEmail === enteredConfirmEmail && enteredEmail.include('@') &&
        enteredPassword.trim().length >= 6);
}

module.exports = {
    validateSignupInputFields: validateSignupInputFields,
}