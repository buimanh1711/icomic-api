const AccountModel = require('../../models/account')
const uploadImage = require('../../utils/uploadImage')
const removeImage = require('../../utils/removeImage')

const update = (req, res, next) => {
  const _id = req.params._id
  const data = req.body
  const { userId, userRole } = req

  if ((_id !== userId) && (userRole !== 'admin')) {
    req.err = 'Bạn không có quyền chinh sửa!'
    next('last')
  }

  const { image, newImage } = data

  if (newImage) {
    if (image && image !== 'null') {
      removeImage(image.publicId, {}, (error, result) => {
        if (error) {
          console.log('Lỗi xóa ảnh!')
        }
        if (result) {
          console.log('Xóa ảnh thành công')
        }
      })
    }

    uploadImage(newImage, {}, (error, result) => {
      if (error) {
        req.err = 'Lỗi upload ảnh ' + error
        return next('last')
      }

      if (result && result.url) {
        data.image = {
          url: result.url,
          publicId: result.public_id || result.public_ids
        }

        AccountModel.findOneAndUpdate({
          _id
        }, data, { new: true })
          .then(resData => {
            if (resData) {
              res.json({
                status: true,
                message: 'Cập nhật thành công!',
                newStaff: resData
              })
            } else {
              req.err = 'Lỗi cập nhật!'
              return next('last')
            }
          })
          .catch(err => {
            next('last')
          })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })

  } else {
    AccountModel.findOneAndUpdate({
      _id
    }, data, { new: true })
      .then(resData => {
        if (resData) {
          res.json({
            status: true,
            message: 'Cập nhật thành công!',
            newStaff: resData
          })
        } else {
          req.err = 'Lỗi cập nhật!'
          return next('last')
        }
      })
      .catch(err => {
        next('last')
      })
  }
}

module.exports = update