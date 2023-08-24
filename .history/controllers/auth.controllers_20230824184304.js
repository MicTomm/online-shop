const bcrypt = require('bcrypt');

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

    let inputData = req.session.inputData;

    if (!inputData) {
        inputData = sessionValidation.getSessionErrorData(
            req,
            {
                message: '',
                enteredEmail: '',
                enteredPassword: ''
            }
        );
    }

    req.session.inputData = null;

    res.render('customer/auth/login', { inputData: inputData });
}

async function createNewUser(req, res, next) {

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
    let doesUserExists;

    try {
        doesUserExists = await validation.checkIfUserAlreadyExists(existingUser);
    } catch (error) {
        console.log('ERROR - auth.controllers => createNewUser() - checkifuserAlreadyExists()');
        return next(error);
    }

    if (doesUserExists) {
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

    try{
        await user.save();
    }catch (error) {
        console.log('ERROR - auth.controllers => createNewUser() - save()');
        return next(error);
    }

    req.session.save(function () {
        res.redirect('/login');
    });

}

async function login(req, res, next) {
    const inputParams = req.body;
    const enteredEmail = inputParams.email;
    const enteredPassword = inputParams.password;

    const checkUser = new User(enteredEmail);
    let doesUserExists;

    try {
        doesUserExists = await validation.checkIfUserAlreadyExists(checkUser);
    } catch (error) {
        console.log('ERROR - auth.controllers => login() - checkIfUserAlreadyExists()');
        return next(error);
    }
    
    if (!doesUserExists) {
        sessionValidation.flashErrorToSession(
            req,
            {
                message: 'Error - No user with this email account is already registered',
                enteredEmail: enteredEmail,
                enteredPassword: enteredPassword
            },
            function () {
                res.redirect('/login');
            }
        );
        return;
    }

    console.log('enteredPassword: ' + enteredPassword);
    console.log('checkUser.password: ' + checkUser.password);
    const isValidPwd = await bcrypt.compare(enteredPassword, checkUser.password);

    if (!isValidPwd) {
        sessionValidation.flashErrorToSession(
            req,
            {
                message: 'Error - The password you have entered is wrong. Try again, please',
                enteredEmail: enteredEmail,
                enteredPassword: enteredPassword
            },
            function () {
                res.redirect('/login');
            }
        );
        return;
    }

    req.session.user = {
        id: checkUser.id,
        email: checkUser.email,
        fullName: checkUser.fullName,
        address: {
            street: checkUser.street,
            city: checkUser.city,
            postalCode: checkUser.postalCode
        }
    }
    req.session.isAuth = true;

    req.session.save(function () {
        res.redirect('/signup'); //reindirizzamento provvisorio in attesa di creazione pagine per admin ed user
    });

}

function logout(req, res) {
    req.session.user = null;
    req.session.isAuth = false;

    req.session.save(function(){
        res.redirect('/login');
    });

}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    createNewUser: createNewUser,
    login: login,
    logout: logout
}
