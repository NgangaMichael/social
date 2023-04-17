const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/social', {
    useUnifiedTopology: true,
})
.then(result => app.listen(3000, console.log('Server has started')))
.catch(err => console.log('Err on connection route'));

app.get('/', (req, res) => {
    try {
        res.render('users/registration')
    } catch (error) {
        console.log('Err on home route')
    }
});

app.get('*', (req, res) => {
    try {
        res.render('posts')
    } catch (error) {
        console.log('Err on not found page')
    }
});