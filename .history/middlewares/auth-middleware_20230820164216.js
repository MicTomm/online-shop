const user = require('../models/user');
const validation = require('../util/validation');

async function auth (req, res, next){

    const isAuth = req.session.isAuth;
    const userSession = req.session.user;

    if (!isAuth || !user) {
        console.log('auth-middlware => auth() - User Not Authenticated');
        return next();
    }

    const user = new User(null, null, null, null, null, null, userSession.id);

    res.locals.isAuth = isAuth;
    next();
}

module.exports = {
    auth: auth
}