function protectRoutes(req, res, next){
    const isAuth = res.locals.isAuth;
    const isAdmin = res.locals.isAdmin;

    if (!isAuth) {
        return res.redirect('/401'); //codice per utente non autenticato
    }
    
    if (isAuth && !isAdmin) {
        return res.redirect('/403'); //codice per utente non autorizzato

    }
    next();
}