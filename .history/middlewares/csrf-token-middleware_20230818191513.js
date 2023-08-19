function getCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}

module.exports = {
    getCsrfToken: getCsrfToken
}