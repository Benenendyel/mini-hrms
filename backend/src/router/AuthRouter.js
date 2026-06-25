const router = require("express").Router();

// controller
const authController = require("../controller/AuthController");

router.post("/api/auth/login", authController.login);

module.exports = router;
