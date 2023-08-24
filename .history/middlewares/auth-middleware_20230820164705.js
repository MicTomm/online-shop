const User = require('../models/user');
const validation = require('../util/validation');

async function auth (req, res, next){

    const isAuth = req.session.isAuth;
    const userSession = req.session.user;

    if (!isAuth || !userSession) {
        console.log('auth-middlware => auth() - User Not Authenticated');
        return next();
    }

    const user = new User(null, null, null, null, null, null, userSession.id);
    const fetchedUser = user.fetchById();

    res.locals.isAuth = isAuth;
    if (fetchedUser.isAdmin) {
        console.log('auth-middlware - IS ADMIN!');
        res.locals.isAdmin = fetchedUser.isAdmin;
    }
    next();
}

module.exports = {
    auth: auth
}