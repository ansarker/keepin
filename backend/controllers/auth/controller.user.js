const crypto = require('crypto');
const passport = require('passport');
const User = require('../../models/auth/model.user');
const genPassword = require('../../lib/passwordStrategy').genPassword;
const validPassword = require("../../lib/passwordStrategy").validPassword;
const decrypt = require("../../helpers/helper").decrypt;
const ErrorResponse = require("../../lib/errorResponse");
const sendEmail = require('../../lib/emailSender');

exports.sign_pp = passport.authenticate('local', { failureRedirect: '/auth/signin-failure', successRedirect: '/auth/signin-success' })

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorResponse('Username or password not given.', 400))
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return next(new ErrorResponse('User not found.', 400))
    }

    const isValid = validPassword(password, user.hash, user.salt);
    if (!isValid) {
      return next(new ErrorResponse('Password doesn\'t match', 400))
    };

    sendToken(user, 201, res);
  } catch (error) {
    next(error)
  }
}

exports.signup = (req, res, next) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorResponse('Check input fields.', 400));
  }

  try {
    const saltHash = genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    User.findOne({ $or: [{ email: email }, { username: username }] }, (err, data) => {
      if (err) throw err;
      if (data) return next(new ErrorResponse('User already exists.', 302));
      if (!data) {
        const newUser = new User({
          email,
          username,
          salt: salt,
          hash: hash
        })

        newUser.save()
          .then((user) => {
            sendToken(user, 200, res);
          })
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.forgot_password = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Couldn't sent email.", 404))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message
      })

      res.status(200).json({ success: true, data: "Email sent" })
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      next(new ErrorResponse("Email could not be sent", 500))
    }
  } catch (error) {
    next(error);
  }
}

exports.reset_password = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }

    const saltHash = genPassword(req.body.password);
    user.salt = saltHash.salt;
    user.hash = saltHash.hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({ success: true, data: "Password reset success" })
  } catch (error) {
    next(error);
  }
}

exports.user_profile = async (req, res, next) => {
  const user = await User.findOne({})
  res.status(201).json({
    success: true,
    user,
    msg: 'You are now signed in'
  });
}

exports.decrypt = (req, res) => {
  const { salt: iv, watchword: encryptedData } = req.query;
  res.json(decrypt({ iv, encryptedData }))
}

const sendToken = (user, statusCode, res) => {
  let token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
}