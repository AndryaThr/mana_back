const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
// const testController = require('./user.controller');

router.post('/signup/', userController.createNewUser);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.putUser);
router.post('/login/', userController.login);
router.put('/pay/', userController.pay);

// router.post('/signup/', (req, res) => {
//     testController.createNewUser(req, res);
// });



module.exports = router;