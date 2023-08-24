function protectRoutes(req, res, next){
    const isAuth = res.locals.isAuth;
    const isAdmin = res.locals.isAdmin;

    if (!isAuth) {
        return res.status(401).redirect('/401'); //codice per utente non autenticato
    }
    
    if (isAuth && !isAdmin) {
        return res.status(403).redirect('/403'); //codice per utente non autorizzato

    }
    next();
}