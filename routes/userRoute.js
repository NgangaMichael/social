const express = require("express");
const router = express.Router();
const userCTRL = require('../controllers/userControl');

router.get('/', userCTRL.register);
router.get('*', userCTRL.notfound);

module.exports = router;