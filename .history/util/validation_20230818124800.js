function validateSignupInputFields(enteredEmail, enteredConfirmEmail, EnteredPassword, enteredFullName){
    return (enteredEmail && enteredConfirmEmail && EnteredPassword && enteredFullName &&
        enteredEmail.trim() !== '' && enteredConfirmEmail.trim() !== '' && 
        enteredPassword.trim() !== '' && enteredFullName.trim() !== '' &&
        enteredEmail === enteredConfirmEmail && enteredEmail.include('@') &&
        EnteredPassword.trim().length >= 6 );
}

module.exports = {
    validateSignupInputFields: validateSignupInputFields
}