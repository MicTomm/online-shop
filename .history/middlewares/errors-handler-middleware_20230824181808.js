function errorsHandler(error, req, res, next){

    if (error.code === 404) {
        res.status(404).render('404');
        return next();
    }

    res.status(500).render('500');
    next();
}

module.exports = {
    errorsHandler: errorsHandler
}; 