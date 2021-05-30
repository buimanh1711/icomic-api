const StoryModel = require('../../models/story')

const deleteComment = (req, res, next) => {
  const { _id, commentId, authorId } = req.params
  const { userId, userRole } = req

  if (userRole !== 'admin' && userId !== authorId) {
    req.err = "Không có quyền!"
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
          message: 'Xóa comment truyện thành công!'
        })
      } else {
        req.err = 'Lỗi xóa comment!' + err
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa comment! ' + err
      next('last')
    })

}

module.exports = deleteComment
