const cookieStorage = require('../storage/cookie')

module.exports = (req, res, next) => {
  if (req.cookies.authCookie && req.cookies.uuid && cookieStorage[req.cookies.uuid] === req.cookies.authCookie) {
    next()
  } else {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
}
