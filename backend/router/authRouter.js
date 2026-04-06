const express= require('express');

const router= express.Router();
const authController= require("../controller/authControler");


router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

// router.post("/logout/:id", authController.deleteUser);

module.exports= router;