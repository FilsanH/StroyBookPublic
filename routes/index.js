const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

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

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean() // returns a javascript object rather than a mongoose
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
