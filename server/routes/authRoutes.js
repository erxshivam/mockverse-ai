const express =
  require("express");

const protect =
  require("../middlewares/authMiddleware");

const {

  signupUser,

  loginUser,

  verifyOTP,

  googleLogin,

} = require(
  "../controllers/authController"
);

const router =
  express.Router();

router.post(
  "/signup",
  signupUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/verify-otp",
  verifyOTP
);
router.post(
  "/google",
  googleLogin
);

router.get(
  "/profile",
  protect,

  (req, res) => {

    res.json({

      message:
        "Protected Profile Route",

      user:
        req.user,

    });

});

module.exports = router;