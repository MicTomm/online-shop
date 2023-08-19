const User = require('../models/user');

function getSignup(req, res){
    res.render('customer/auth/signup');
}
function getLogin(req, res){

}

function logout(req, res){

}

function createNewUser(req, res){

const bodyParams = req.body;

const user = new User(
    bodyParams.email,
    bodyParams.password,
    bodyParams.fullName,
    bodyParams.street,
    bodyParams.city,
    bodyParams.postalCode );
}

function login(req, res){

}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    logout: logout,
    createNewUser: createNewUser,
    login: login
}
