const express = require('express');
const userController = require('../controllers/user-controller');
//const {check} = require('express-validator');

const router = express.Router();

router.post("/signup",userController.addNewUser);

module.exports = router;