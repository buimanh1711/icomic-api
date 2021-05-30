const jwt = require('jsonwebtoken')
const AccountModel = require('../../models/account')

const login = (req, res, next) => {
  const data = req.body

  AccountModel.findOne({
    username: data.username,
    password: data.password
  })
    .then(resData => {
      if (resData) {
        const { _id, username, password, role } = resData
        const token = jwt.sign({ _id, username, password, role }, 'mb1o4er')
        const userData = resData

        res.json({
          status: true,
          message: 'Đăng nhập thành công!',
          user: userData,
          token: token
        })
      } else {
        req.err = 'Sai tài khoản hoặc mật khẩu!'
        next('last')
      }
    })
}

module.exports = login
