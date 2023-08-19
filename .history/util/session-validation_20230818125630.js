function flashErrorToSession(req, data, action){

    let sessionData =  req.session.sessionData;

    sessionData = {
        hasError: true,
        ...data
    }

    req.save(action);

}

module.exports = {
    flashErrorToSession: flashErrorToSession
}