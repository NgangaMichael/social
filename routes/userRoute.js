const express = require("express");
const router = express.Router();
const userCTRL = require('../controllers/userControl');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/userImages'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {fieldSize: 3 * 1024 * 1024}
}).single('image')

router.get('/', userCTRL.register);
router.get('/policy', userCTRL.policy);
router.post('/adduser', upload, userCTRL.adduser);
router.post('/login', userCTRL.login);
router.post('/logout', userCTRL.logout);

module.exports = router;