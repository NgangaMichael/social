const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const userRoute = require('./routes/userRoute');
const dbsetup = require('./database/dbsetup');
dbsetup();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(userRoute);

app.listen(3000, () => {
    console.log('Server has started')
})