const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// @desc    Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      
      // If user exists but is not verified, we'll update their info
      user.name = name;
      user.password = await bcrypt.hash(password, 10);
    } else {
      user = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        isVerified: false,
      });
    }

    // Generate a new 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = hashedOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: "Verify your DreamCup account",
        message: `Your verification code is ${otp}. It expires in 10 minutes.`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d1117; color: #e6edf3; padding: 40px; border-radius: 12px; border: 1px solid #30363d; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">DreamCup</h1>
              <p style="color: #8b949e; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">Elite Fantasy Football</p>
            </div>
            
            <div style="background-color: #161b22; padding: 30px; border-radius: 8px; border: 1px solid #21262d;">
              <h2 style="margin-top: 0; color: #ffffff; font-size: 22px; text-align: center;">Verify Your Email Address</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #c9d1d9; text-align: center;">
                Welcome to DreamCup! You're just one step away from building your elite squad. Please use the verification code below to activate your account.
              </p>
              
              <div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 6px; padding: 20px; margin: 30px 0; text-align: center;">
                <span style="font-family: monospace; font-size: 36px; font-weight: bold; color: #d4af37; letter-spacing: 8px;">${otp}</span>
              </div>
              
              <p style="font-size: 14px; color: #8b949e; text-align: center; margin-bottom: 0;">
                This code will expire in <strong>10 minutes</strong>.<br/>
                If you did not request this, please safely ignore this email.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #30363d; padding-top: 20px;">
              <p style="font-size: 12px; color: #8b949e;">
                &copy; ${new Date().getFullYear()} DreamCup Elite. All rights reserved.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError);
      // We still return 201 so the user can be registered, though OTP failed to send
      // In production, we might want to handle this differently
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email with the OTP sent.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified. Please verify your email first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyOTP,
  updateProfile,
};