function errorsHandler(error, req, res, next){
    res.status(500).render('500');
}

module.exports = {
    errorsHandler: errorsHandler
}; 