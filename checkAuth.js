// next means do this thing, then move on
// this is our own middleware

function checkAuth(req, res, next) {
    // check if user exists on session
    // truthy statement (the if one) so if there is a user...
    if (req.session.user) {
        next();
    // if the req is on the login page
    } else if (req.path === '/users/login') {
        next();
    // else send an error
    } else {
        // send error unauth user, send back json object that displays error message
        res.status(401).json({ error: 'not logged in' })
    }
}



// to use in the whole app
module.exports = checkAuth