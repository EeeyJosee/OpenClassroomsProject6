const express = require('express');
const router = express.Router();

const signupCtrl = require('../controllers/signup');

router.post('/', signupCtrl.createCredential);

module.exports = router;