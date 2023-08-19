const User = require('../models/user');
const validation = require('../util/validation');
const sessionValidation = require('../util/session-validation');

function getSignup(req, res) {

    let inputData = req.session.inputData;

    if (!inputData) {
        inputData = sessionValidation.getSessionErrorData(
            req,
            {
                message: '',
                enteredEmail: '',
                enteredConfirmEmail: '',
                enteredPassword: '',
                enteredFullName: '',
                enteredStreet: '',
                enteredCity: '',
                enteredPostalCode: ''
            }
        );
    }

    req.session.inputData = null;

    res.render('customer/auth/signup', { inputData: inputData });
}
function getLogin(req, res) {
    res.render('customer/auth/login');
}

function logout(req, res) {

}

async function createNewUser(req, res) {

    const bodyParams = req.body;

    const enteredEmail = bodyParams.email;
    const enteredConfirmEmail = bodyParams['confirm-email'];
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
            }
        );
        return;
    }

    const existingUser = new User(enteredEmail);

    if (existingUser.findByEmail()) {
        sessionValidation.flashErrorToSession(
            req,
            {
                message: 'Error, this email is already registered',
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
            }
        );
        return;
    }

    const user = new User(
        enteredEmail,
        enteredPassword,
        enteredFullName,
        enteredStreet,
        enteredCity,
        enteredPostalCode
    );

    await user.save();

    req.save(function () {
        res.redirect('/login');
    });

}

function login(req, res) {
    const inputParams = req.body;
    const enteredEmail = inputParams.email;
    const enteredPassword = inputParams.password;

    const existingUser = new User(enteredEmail, null, enteredPassword);
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    logout: logout,
    createNewUser: createNewUser,
    login: login
}
