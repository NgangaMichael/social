const express = require("express");
const router = express.Router();
const userCTRL = require('../controllers/userControl');

router.get('/', userCTRL.register);
router.post('/adduser', userCTRL.adduser);
router.post('/login', userCTRL.login);
router.post('/logout', userCTRL.logout);
router.get('*', userCTRL.notfound);

module.exports = router;