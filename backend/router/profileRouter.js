const express= require('express');
const profileController= require('../controller/profileController');
const { authMiddleware }= require('../midlleware/auth');

const router= express.Router();

router.get("/user-profile", authMiddleware, profileController.getProfile);

router.post("/user-profile", authMiddleware, profileController.postProfile);

router.delete("/user-profile", authMiddleware, profileController.deleteProfile);

router.put("/user-profile", authMiddleware, profileController.updateProfile);

module.exports= router;