function flashErrorToSession(req, data, action) {

    req.session.inputData = {
        hasError: true,
        ...data
    }

    req.save(action);

}

function getSessionErrorData(req, data) {
    return req.session.inputData = {
        hasError: false,
        ...data
    };
}

module.exports = {
    flashErrorToSession: flashErrorToSession
}