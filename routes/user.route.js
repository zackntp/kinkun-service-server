//define api endpoint

const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();

router.post('/',userController.upload,userController.createUser)

router.get('/:userEmail/:userPassword',userController.checkLogin)


router.put('/:userId',userController.upload,userController.editUser)

module.exports = router;