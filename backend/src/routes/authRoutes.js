const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyOTP,
  updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;