// middleware are just functions that have access to the req, res elements

// check if user is logged in, if so then allow access to dashboard if not then don't
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('heer1')

      return next()
    } else {
      console.log('heer2')

      res.redirect('/')
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('heer3')
      res.redirect('/dashboard')
    } else {
      console.log('heer4')

      return next()
    }
  },
}
