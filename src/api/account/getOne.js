const AccountModel = require('../../models/account')

const getOne = (req, res, next) => {
  const { userId } = req
  const { _id } = req.params

  AccountModel.findOne({ _id })
    .then(resData => {
      let official = null
      if (resData) {
        if (_id === userId) {
          official = true
        }
        res.json({
          status: true,
          official: official,
          staffData: resData
        })
      } else {
        req.err = 'Không tìm thấy nhân viên!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy thông tin nhân viên! ' + err
      next('last')
    })
}

module.exports = getOne