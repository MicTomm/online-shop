const user = require('../models/user');

async function auth (req, res, next){

    const isAuth = req.session.isAuth;
    const user = req.session.user;

    if (!isAuth || !user) {
        console.log('auth-middlware => auth() - User Not Authenticated');
        return next();
    }



    res.locals.isAuth = isAuth;
    next();
}

module.exports = {
    auth: auth
}