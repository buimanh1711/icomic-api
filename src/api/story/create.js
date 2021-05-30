const StoryModel = require('../../models/story')
const uploadImage = require('../../utils/uploadImage')

const create = (req, res, next) => {
  const data = req.body

  const { image } = data
  const { userRole } = req

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  data.categories = JSON.parse(data.categories).map(item => ({ category: item }))

  StoryModel.findOne({
    slug: data.slug
  })
    .then(resData => {
      if (resData) {
        req.err = 'Truyện đã tồn tại!'
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

              const newStory = new StoryModel(newData)
              newStory.save(err => {
                if (err === null) {
                  res.json({
                    status: true,
                    newStory: newStory,
                    message: 'Thêm truyện thành công!'
                  })
                } else {
                  req.err = `Thêm truyện thất bại! + ${err}`
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
          const newStory = new StoryModel(newData)
          newStory.save(err => {
            if (err === null) {
              res.json({
                status: true,
                newStory: newStory,
                message: 'Thêm truyện thành công!'
              })
            } else {
              req.err = `Thêm truyện thất bại! + ${err}`
              next('last')
            }
          })
        }
      }
    })
    .catch(err => {
      req.err = `Thêm truyện thất bại! + ${err}`
      next('last')
    })
}

module.exports = create