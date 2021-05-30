const StoryModel = require('../../models/story')

const removeComment = (req, res, next) => {
  const { _id, authorId, commentId } = req.params
  
  const { userId, userRole } = req

  if (userId !== authorId && userRole !== 'admin') {
    req.err = "Bạn không có quyền!"
    return next('last')
  }

  StoryModel.updateOne({
    _id
  }, {
    $pull: {
      comments: { _id: commentId }
    }
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Xóa comment truyện thành công!',
        })
      } else {
        req.err = 'Lỗi xóa comment!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa comment! ' + err
      next('last')
    })
}

module.exports = removeComment

