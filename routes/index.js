const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing Page
// @route   GET

router.get('/', ensureGuest, (req, res) => {
  console.log(req.isAuthenticated())
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Login/Landing Page
// @route   GET

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

module.exports = router
