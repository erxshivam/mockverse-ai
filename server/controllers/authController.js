const User =
  require("../models/User");

const admin =
  require("../config/firebaseAdmin");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const {
  sendOTPEmail,
} = require(
  "../services/emailService"
);

const signupUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res
          .status(400)
          .json({

            message:
              "User already exists",

          });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const otp =
        Math.floor(

          100000 +
          Math.random() *
          900000

        ).toString();

      const otpExpiry =
        new Date(

          Date.now() +
          5 * 60 * 1000

        );

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          otp,

          otpExpiry,

        });

      await sendOTPEmail(

        email,

        otp

      );

      user.password =
        undefined;

      res.status(201).json({

        message:
          "OTP sent to email",

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({

            message:
              "User not found",

          });

      }

      if (
        !user.isVerified
      ) {

        return res
          .status(400)
          .json({

            message:
              "Please verify OTP first",

          });

      }

      const isMatch =
        await bcrypt.compare(

          password,

          user.password

        );

      if (!isMatch) {

        return res
          .status(400)
          .json({

            message:
              "Invalid credentials",

          });

      }

      const token =
        jwt.sign(

          {
            id: user._id,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

      user.password =
        undefined;

      res.status(200).json({

        message:
          "Login successful",

        token,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};

const verifyOTP =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({

            message:
              "User not found",

          });

      }

      if (
        user.otp !== otp
      ) {

        return res
          .status(400)
          .json({

            message:
              "Invalid OTP",

          });

      }

      if (
        user.otpExpiry <
        new Date()
      ) {

        return res
          .status(400)
          .json({

            message:
              "OTP expired",

          });

      }

      user.isVerified =
        true;

      user.otp = null;

      user.otpExpiry =
        null;

      await user.save();

      const token =
  jwt.sign(

    {
      id: user._id,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

);

user.password =
  undefined;

res.status(200).json({

  message:
    "Email verified successfully",

  token,

  user,

});

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error",

      });

    }

};
const googleLogin =
  async (req, res) => {

    try {

      const { idToken } =
        req.body;

      const decoded =
        await admin
          .auth()
          .verifyIdToken(
            idToken
          );

      let user =
        await User.findOne({

          email:
            decoded.email,

        });

      if (!user) {

        user =
          await User.create({

            name:
              decoded.name,

            email:
              decoded.email,

            photoURL:
              decoded.picture || "",

            password: null,

            isVerified:
              true,

          });

      } else {

        user.photoURL =
          decoded.picture || "";

        await user.save();

      }

      const token =
        jwt.sign(

          {
            id: user._id,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }

        );

      user.password =
        undefined;

      res.status(200).json({

        token,

        user,

      });

    } catch (error) {

      console.log(error);

      res.status(401).json({

        message:
          "Google login failed",

      });

    }

};

module.exports = {

  signupUser,

  loginUser,

  verifyOTP,

  googleLogin,

};