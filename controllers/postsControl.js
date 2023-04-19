const Post = require('../models/postsmodel');

exports.home = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('posts/posts', {posts});
    } catch (error) {
        console.log('Err on all posts route', error)
    }
}

exports.post = async (req, res) => {
    try {
        const {post} = req.body;
        const savepost = new Post({
            post: post,
            postimage: req.file.filename,
        })
        await savepost.save();
        res.redirect('/home');
    } catch (error) {
        console.log('Err on post post route', error)
    }
}