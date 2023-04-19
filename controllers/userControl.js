const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiry = 60 * 60 * 1;
const secret = 'mancity';

const createToken = ({id}) => {
    return jwt.sign({id}, secret, {expiresIn: expiry * 1000})
}

exports.register = (req, res) => {
    try {
        res.render('users/registration')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.adduser = async (req, res) => {
    try {
        const {name, age, email, gender, country, password} = req.body;
        const hashPass = await bcrypt.hash(password, 12);
        const addUser = User.create({
            name: name,
            email: email,
            age: age,
            country: country,
            gender: gender,
            password: hashPass
        })
        await addUser;
        res.render('posts/posts')
    } catch (error) {
        console.log('Err on add user', error)
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userEmail = await User.findOne({email});
        if(userEmail) {
            const validation = await bcrypt.compare(password, userEmail.password,);
            if(validation) {
                const token = createToken(userEmail._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: expiry * 1000});
                res.redirect('/home')
            } else {
                res.redirect('/')
            }
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log('Err on login', error);
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/')
    } catch (error) {
        console.log('Error on logout', error)
    }
}