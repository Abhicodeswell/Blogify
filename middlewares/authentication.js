const { validateToken } = require('../services/authentication');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next(); // Return here to avoid calling next() twice
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            next();
        } catch (error) {
            // Handle the error if needed
            next(); // Make sure to call next() even if there's an error
        }
    };
}

module.exports = { checkForAuthenticationCookie };
