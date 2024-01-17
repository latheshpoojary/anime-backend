const userSchema = require("../database/schemas/User");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require("../env");
async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json("email not exist");
  } else {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpier = new Date();
    otpExpier.setMinutes(otpExpier.getMinutes() + 1);
    const response = userSchema.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: otp,
          otpExpier: otpExpier,
        },
      }
    );
    response
      .then( () => {
        let config = {
          host: 'host',
          port:3001,
          service: "gmail",
          secure : false,
          auth: {
            user: EMAIL,
            pass: PASSWORD,
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
        };
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
          theme: "default",
          product: {
            name: "Mailgen",
            link: "https://mailgen.js/",
          },
        });

        let response = {
          body: {
            name: "There",
            intro: `Your One Time password for reset password(expire in 1 Min) <b>${otp}<b>`,
            outro: "Enter this OTP in the loginFusion",
          },
        };
        let mail = MailGenerator.generate(response);
        let message = {
          from: EMAIL,
          to: email,
          subject: "Reset Password",
          html: mail,
        };
        transporter
          .sendMail(message)
          .then(() => {
            return res.status(201).json({
              msg: "you should receive an email",
            });
          })
          .catch((error) => {
            return res.status(500).json({ error });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json("something went wrong");
      });
  }
}

// async function main(transporter) {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "latheshpoojary2639@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

module.exports = { forgotPassword };
