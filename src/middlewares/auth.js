const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.headers.authorization

  if (token && token !== 'null') {
    let result = jwt.verify(token, 'mb1o4er')
    if (result) {
      req.userId = result._id
      req.userRole = result.role
      next()
    } else {
      req.err = 'Bạn chưa đăng nhập!'
    }
  } else {
    req.err = 'Bạn chưa đăng nhập!'
    next('last')
  }

}
