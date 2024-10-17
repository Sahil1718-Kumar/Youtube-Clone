const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/user')
//to create
router.post("/signUp",UserController.signUp)
router.post("/login",UserController.signIn)
router.post('/logout',UserController.logout)
router.delete('/deleteUser/:id',UserController.deleteUser)

module.exports = router;