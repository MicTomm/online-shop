const User = require('../models/user');
const validation = require('../util/validation');
const sessionValidation = require('../util/session-validation');

function getSignup(req, res) {
    res.render('customer/auth/signup');
}
function getLogin(req, res) {

}

function logout(req, res) {

}

async function createNewUser(req, res) {

    const bodyParams = req.body;

    const enteredEmail = bodyParams.email;
    const enteredConfirmEmail = bodyParams.confirmEmail;
    const enteredPassword = bodyParams.password;
    const enteredFullName = bodyParams['full-name'];
    const enteredStreet = bodyParams.street;
    const enteredCity = bodyParams.city;
    const enteredPostalCode = bodyParams['postal-code'];

    if (!validation.validateSignupInputFields(enteredEmail, enteredConfirmEmail, 
        enteredPassword, enteredFullName, enteredStreet, enteredCity, enteredPostalCode)) {

        sessionValidation.flashErrorToSession(
            req,
            {
                message: 'Error during the fields\' validation - check them again, please',
                enteredEmail: enteredEmail,
                enteredConfirmEmail: enteredConfirmEmail,
                enteredPassword: enteredPassword,
                enteredFullName: enteredFullName,
                enteredStreet: enteredStreet,
                enteredCity: enteredCity,
                enteredPostalCode: enteredPostalCode
            },
            function () {
                res.redirect('/signup');
                return;
            }
        );
    }

    /**
     * if(!validazioneCampi){
     *  oggettoErrori
     *  redirect('/signup') => visualizzando campo inseriti
     * }
     */

    /**
     * controllo email già esistente
     */

    // const user = new User(
    //     bodyParams.email,
    //     bodyParams.password,
    //     bodyParams['full-name'],
    //     bodyParams.street,
    //     bodyParams.city,
    //     bodyParams['postal-code']
    // );

    await user.save();
    res.redirect('/login');

}

function login(req, res) {

}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    logout: logout,
    createNewUser: createNewUser,
    login: login
}
