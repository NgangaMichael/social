const User = require('../models/usermodel');
const bcrypt = require('bcrypt');

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
        
    } catch (error) {
        console.log('Err on login', error);
    }
}

exports.logout = async (req, res) => {
    try {
        
    } catch (error) {
        console.log('Error on logout', error)
    }
}

exports.notfound = (req, res) => {
    try {
        res.render('users/notfound')
    } catch (error) {
        console.log('Err on not found page')
    }
};