const router = require('express').Router();
const { protect } = require('../../middleware/auth');
const {
  signin,
  signup,
  user_profile,
  forgot_password,
  reset_password,
  decrypt
} = require("../../controllers/auth/controller.user");

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgot-password', forgot_password);
router.put('/reset-password/:resetToken', reset_password);
router.get('/user-profile', protect, user_profile);
router.get('/decrypt', decrypt)

/**
 * -------- View Routes --------
 */
router.get('/signin', (req, res) => {
  res.send("<form action='/auth/signin' method='POST'><h1>Sign in</h1><input type='text' placeholder='Username' name='username'><input type='password' placeholder='Password' name='password'><button type='submit'>Sign in</button></form>");
})

router.get('/signup', (req, res) => {
  res.send("<form action='/auth/signup' method='POST'><h1>Sign up</h1><input type='text' placeholder='Username' name='username'><input type='password' placeholder='Password' name='password'><button type='submit'>Sign up</button></form>");
})

module.exports = router;