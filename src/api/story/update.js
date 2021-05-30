const StoryModel = require('../../models/story')
const uploadImage = require('../../utils/uploadImage')
const removeImage = require('../../utils/removeImage')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body

  const { userRole } = req
  if (!Array.isArray(data.categories)) {
    data.categories = JSON.parse(data.categories).map(item => ({ category: item }))
  }

  if (typeof data.image === 'string') {
    data.image = JSON.parse(data.image)
  }

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền'
    return next('last')
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

        StoryModel.findOneAndUpdate({
          _id
        }, data, { new: true })
          .then(resData => {
            if (resData) {
              res.json({
                status: true,
                message: 'Cập nhật thành công!',
                newStory: resData
              })
            } else {
              req.err = 'Lỗi cập nhật!'
              return next('last')
            }
          })
          .catch(err => {
            req.err = 'Lỗi cập nhật ' + err
            next('last')
          })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })

  } else {
    StoryModel.findOneAndUpdate({
      _id
    }, data, { new: true })
      .then(resData => {
        if (resData) {
          res.json({
            status: true,
            message: 'Cập nhật thành công!',
            newStory: resData
          })
        } else {
          req.err = 'Lỗi cập nhật!'
          return next('last')
        }
      })
      .catch(err => {
        req.err = 'Lỗi cập nhật! ' + err
        next('last')
      })
  }


}

module.exports = update