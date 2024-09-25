const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// const sauceCtrl = require('../controllers/sauce');

// router.get('/', auth, sauceCtrl.);
// router.post('/', auth, sauceCtrl.);
// router.put('/', auth, sauceCtrl.);
// router.delete('/', auth, sauceCtrl.);

module.exports = router;