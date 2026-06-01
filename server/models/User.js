const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },
      photoURL: {
  type: String,
  default: "",
},

      password: {
  type: String,
  default: null,
},

      otp: {
        type: String,
      },

      otpExpiry: {
        type: Date,
      },

      isVerified: {
        type: Boolean,
        default: false,
      },

    },

    {
      timestamps: true,
    }

);

module.exports =
  mongoose.model(
    "User",
    userSchema
  );