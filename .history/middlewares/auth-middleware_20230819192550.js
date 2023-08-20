const db = require('../data/database');
const User = require('../models/user');

async function auth (req, res, next){

    const isAuth = req.session.isAuth;

    if(!isAuth){
        console.log('auth-middlware => auth() - User Not Authenticated');
        return next();
    }

    res.locals.isAuth = isAuth;
    next();
}