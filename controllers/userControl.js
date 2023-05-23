const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiry = 60 * 60 * 1;
const secret = 'mancity';
const Post = require('../models/postsmodel');
const Comment = require('../models/comments');

const createToken = ({_id}) => {
    return jwt.sign({_id}, secret, {expiresIn: expiry * 1000})
}

exports.register = (req, res) => {
    try {
        res.render('users/registration')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.profile = async (req, res) => {
    try {
        const posts = await Post.find()
        .sort({createdAt: 'desc'})
        .populate('users')
        .populate('likes')
        .populate('dislikes')
        
        // this carries the user name cause we have only stored the id 
        .populate({
            path: 'comments',
            populate: {
              path: 'user',
              select: ['name', 'image', 'email', 'age'],
            }
        })
        res.render('users/profile', {posts});
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.notifications = (req, res) => {
    try {
        res.render('users/notifications')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.messages = (req, res) => {
    try {
        res.render('users/messages')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.groups = (req, res) => {
    try {
        res.render('users/groups')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.network = (req, res) => {
    try {
        res.render('users/network')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.adduser = async (req, res) => {
    try {
        const {name, age, email, gender, country, password} = req.body;
        const hashPass = await bcrypt.hash(password, 12);
        const addUser = await User.create({
            name: name,
            email: email,
            age: age,
            country: country,
            gender: gender,
            password: hashPass,
            image: req.file.filename
        })
        await addUser;
        res.redirect('/home')
        // console.log(addUser)
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
exports.policy = (req, res) => {
    try {
        res.render('users/policy')
    } catch (error) {
        console.log('Err on home route')
    }
};