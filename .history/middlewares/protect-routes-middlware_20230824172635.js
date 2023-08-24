function protectRoutes(req, res, next){
    const isAuth = res.locals.isAuth;

    if (!isAuth) {
        res.status(401).redirect('/401');
    }
}