const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const secret = 'mancity';

const authUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secret, (err, decodeToken) => {
            if(err) {
                res.redirect('/')
            } else {
                next();
            }
        })
    } else {
        res.redirect('/')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, secret, async (err, decodeToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodeToken._id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {authUser, checkUser}