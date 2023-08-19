function validateSignupInputFields(enteredEmail, enteredConfirmEmail, EnteredPassword, enteredFullName,
    enteredCity, enteredCity, enteredPostalCode) {
    return (enteredEmail && enteredConfirmEmail && EnteredPassword && enteredFullName &&
        enteredStreet && enteredCity && enteredPostalCode &&
        enteredStreet.trim() !== '' && enteredCity !== '' && enteredPostalCode !== '' &&
        enteredEmail.trim() !== '' && enteredConfirmEmail.trim() !== '' &&
        enteredPassword.trim() !== '' && enteredFullName.trim() !== '' &&
        enteredEmail === enteredConfirmEmail && enteredEmail.include('@') &&
        EnteredPassword.trim().length >= 6);
}

module.exports = {
    validateSignupInputFields: validateSignupInputFields
}