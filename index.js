const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./middleware/auth');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postsRoute');
const groupRoute = require('./routes/groupsRoute');
const dbsetup = require('./database/dbsetup');
dbsetup();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use('*', checkUser);
app.use(userRoute);
app.use(postRoute);
app.use(groupRoute);
app.use(express.json());

app.listen(3000, () => {
    console.log('Server has started')
});