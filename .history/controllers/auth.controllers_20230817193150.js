const User = require('../models/user');

function getSignup(req, res) {
    res.render('customer/auth/signup');
}
function getLogin(req, res) {

}

function logout(req, res) {

}

async function createNewUser(req, res) {

    const bodyParams = req.body;

/**
 * if(!validazioneCampi){
 *  oggettoErrori
 *  redirect('/signup') => visualizzando campo inseriti
 * }
 */

/**
 * controllo email già esistente
 */

    const user = new User(
        bodyParams.email,
        bodyParams.password,
        bodyParams['full-name'],
        bodyParams.street,
        bodyParams.city,
        bodyParams['postal-code']
    );

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
