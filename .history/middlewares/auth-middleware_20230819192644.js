async function auth (req, res, next){

    const isAuth = req.session.isAuth;

    if(!isAuth){
        console.log('auth-middlware => auth() - User Not Authenticated');
        return next();
    }

    res.locals.isAuth = isAuth;
    next();
}

module.exports = {
    auth: auth
}