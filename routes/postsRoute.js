const express = require('express');
const router = express.Router();
const {authUser} = require('../middleware/auth');
const postCTRL = require('../controllers/postsControl');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/postsImages'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {fieldSize: 1040 * 1040 * 3}
}).single('postimage');

router.get('/home', authUser, postCTRL.home);
router.post('/post', authUser, upload, postCTRL.post);
router.post('/repost', authUser, postCTRL.repost);
router.post('/comment', authUser, upload, postCTRL.comment);
router.post('/likes', authUser, postCTRL.likePost);
router.post('/dislikes', authUser, postCTRL.dislikePost);
router.get('/editpostpage/:id', authUser, postCTRL.editpostpage);
router.delete('/deletepost/:id', authUser, postCTRL.deletepost);

module.exports = router;