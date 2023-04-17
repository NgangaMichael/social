const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/social', {
        useUnifiedTopology: true,
    })
    .then(result => console.log('Database connected'))
    .catch(err => console.log('Err on database connection'))
}