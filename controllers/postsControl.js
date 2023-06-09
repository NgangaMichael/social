const Post = require('../models/postsmodel');
const User = require('../models/usermodel');
const Comment = require('../models/comments');

exports.home = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: 'desc'})
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
        res.render('posts/posts', {posts});
    } catch (error) {
        console.log('Err on all posts route', error)
    }
}

exports.post = async (req, res) => {
    try {
        const {post, userid} = req.body;
        const savepost = new Post({
            post: post,
            postimage: req.file.filename,
        })
        await savepost.save();
        // finding id and pushing to array of user id in blogs model
        const user = await User.findById(userid);
        savepost.users.push(user._id);
        await savepost.save();

        res.redirect('/home');
    } catch (error) {
        console.log('Err on post post route', error)
    }
}

exports.editpostpage = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findById(id);
    res.render('posts/editpostpage', {post})
  } catch (error) {
    console.log('Error on edit post page', error)
  }
}

exports.repost = async (req, res) => {
  try {
    const {post, userid, postid} = req.body;
    const originalpost = await Post.findById(postid);

    const saverpost = new Post({
      post: originalpost.post,
      postimage: originalpost.postimage
    })

    await saverpost.save();
    saverpost.users.push(userid);
    saverpost.reposts.push(postid);
    await saverpost.save();

    res.redirect('/home');
  } catch (error) {
      console.log('Err on repost route', error)
  }
}

exports.likePost = async (req, res) => {
    try {
      const postId = req.body.postId;
      const userId = req.body.userId;
      const post = await Post.findById(postId);
  
      // Add user id to likes array if it doesn't exist
      if (!post.likes.includes(userId)) {
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { likes: userId }
        });
      }
  
      res.redirect('/home');
    } catch (error) {
      console.log('Error on like post route', error)
    }
  }
  

exports.dislikePost = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId;
        const post = await Post.findById(postId);
    
        // Add user id to likes array if it doesn't exist
        if (!post.dislikes.includes(userId)) {
          await Post.findByIdAndUpdate(postId, {
            $addToSet: { dislikes: userId }
          });
        }
    
        res.redirect('/home');
      } catch (error) {
        console.log('Error on like post route', error)
      }
}

exports.comment = async (req, res) => {
    try {
        const { comment, commentuserid, postid } = req.body;
        const user = await User.findById(commentuserid);
        const post = await Post.findById(postid);
        
        const newComment = new Comment({
            user: user._id,
            comment: comment,
        });
        await newComment.save();

        post.comments.push(newComment);
        await post.save();

        res.redirect('/home');
    } catch (error) {
        console.log(error);
    }
};

exports.deletepost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndRemove(id);
  // redirect to the same page 
  res.redirect(req.get('referer'));
}

