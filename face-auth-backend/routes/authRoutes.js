const { Router } = require("express");

const router = Router();
const {
  handleUserRegistration,
  handleLogin,
  handleFaceAuth,
} = require("../Controllers/auth");

router.post("/register", handleUserRegistration);

router.post("/login", handleLogin);

router.get("/faceAuth", handleFaceAuth);

module.exports = router;
