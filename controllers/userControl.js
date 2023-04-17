exports.register = (req, res) => {
    try {
        res.render('users/registration')
    } catch (error) {
        console.log('Err on home route')
    }
};

exports.notfound = (req, res) => {
    try {
        res.render('posts')
    } catch (error) {
        console.log('Err on not found page')
    }
};