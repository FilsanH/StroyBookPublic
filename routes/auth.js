const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google

router.get(
  '/google',
  passport.authenticate(
    'google', //specify the strategy create in passport.js and use this to authenticate
    { scope: ['profile'] }
  )
)

// @desc    Google auth callback
// @route   GET /auth/google/callback

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('hi')
    console.log(req.isAuthenticated())
    res.redirect('/dashboard')
  }
)

//@desc Logout user
// @route  /auth/logout
router.get('/logout', (req, res) => {
  //passport puts a logout method on the req object
  console.log(req.isAuthenticated())

  req.logout()
  console.log(req.isAuthenticated())

  res.redirect('/')
})
module.exports = router
