const AccountModel = require('../../models/account')

const commonAuth = (req, res, next) => {
  const { userId } = req
  AccountModel.findOne({
    _id: userId
  })
    .then(resData => {
      if (resData) {
        const userData = resData
        userData.password = null

        res.json({
          status: true,
          login: true,
          user: userData
        })
      } else {
        req.err = 'Không thể xác thực!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy thông tin xác thực!'
      next('last')
    })
}

module.exports = commonAuth