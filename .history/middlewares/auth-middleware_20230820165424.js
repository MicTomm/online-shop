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
    let fetchedUser;
    try {
        fetchedUser = await user.fetchById();    
    } catch (error) {
        return next();
    }

    res.locals.isAuth = isAuth;
    res.locals.isAdmin = fetchedUser.isAdmin;
    console.log('auth-middleware => IS_ADMIN: ' + fetchedUser.isAdmin);
  
    next();
}

module.exports = {
    auth: auth
}