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

async function validateEnteredPassword(storedHashedPwd, enteredPwd){

    return await bcrypt.compare(enteredPwd, storedHashedPwd);

}

module.exports = {
    validateSignupInputFields: validateSignupInputFields,
    validateEnteredPassword: validateEnteredPassword
}