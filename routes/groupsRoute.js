const express = require('express');
const router = express.Router();
const {authUser} = require('../middleware/auth');
const groupCTRL = require('../controllers/groupsController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/groupimages'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {fieldSize: 1040 * 1040 * 3}
}).single('groupimage');

router.post('/creategroup', authUser, upload, groupCTRL.creategroup);
router.get('/editgroup/:id', authUser, groupCTRL.editgroup);
router.delete('/deletegroup/:id', authUser, groupCTRL.deletegroup);

module.exports = router;