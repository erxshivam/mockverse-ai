const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },

  });

const sendOTPEmail =
  async (
    email,
    otp
  ) => {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    await transporter.verify();
console.log("SMTP Connected");
    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "MockVerse AI OTP Verification",

      html: `

      <div style="
        font-family: Arial;
        padding: 30px;
      ">

        <h2>
          MockVerse AI
        </h2>

        <p>
          Your verification OTP is:
        </p>

        <h1 style="
          letter-spacing: 6px;
        ">
          ${otp}
        </h1>

        <p>
          OTP valid for 5 minutes.
        </p>

      </div>

      `,

    });

};

module.exports = {
  sendOTPEmail,
};