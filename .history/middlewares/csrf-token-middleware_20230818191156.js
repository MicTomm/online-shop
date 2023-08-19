function getCsrfToken(req, res, next) {
    res.locals.csrfToken = res.csrfToken();
    next();
}

module.exports = {
    getCsrfToken: getCsrfToken
}