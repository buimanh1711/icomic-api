const AccountModel = require('../../models/account')
const uploadImage = require('../../utils/uploadImage')

const create = (req, res, next) => {
  const data = req.body
  const { image } = data

  AccountModel.findOne({
    username: data.username
  })
    .then(resData => {
      if (resData) {
        req.err = 'Người dùng đã tồn tại!'
        next('last')
      } else {
        if (image && image !== 'null') {
          uploadImage(image, {}, (err, result) => {
            if (err) {
              req.err = 'Lỗi upload ảnh!'
              return next('last')
            }

            if (result && result.url) {
              const newData = {
                ...data,
                image: {
                  url: result.url,
                  publicId: result.public_ids || result.public_id
                }
              }

              const newAccount = new AccountModel(newData)

              newAccount.save(err => {
                if (err === null) {
                  res.json({
                    status: true,
                    message: 'Tạo Người dùng thành công!',
                    staff: newAccount
                  })
                } else {
                  req.err = `Đăng kí thất bại! + ${err}`
                  next('last')
                }
              })
            }
          })
        } else {
          const newData = {
            ...data,
            image: null
          }
          const newAccount = AccountModel(newData)
          
          newAccount.save(err => {
            if (err === null) {
              res.json({
                status: true,
                message: 'Tạo Người dùng thành công!',
                staff: newAccount
              })
            } else {
              req.err = `Đăng kí thất bại! + ${err}`
              next('last')
            }
          })

        }
      }
    })
}

module.exports = create