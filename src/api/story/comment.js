const StoryModel = require('../../models/story')
const mongoose = require('mongoose')

const comment = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { content } = data
  const { userId } = req

  let  newCommentId = mongoose.Types.ObjectId()
  StoryModel.updateOne({
    _id
  }, {
    $push: {
      comments: { _id: newCommentId, author: { _id: userId }, content, createdAt: Date.now() }
    }
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'comment truyện thành công!',
          newCommentId: newCommentId
        })
      } else {
        req.err = 'Lỗi comment!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi comment! ' + err
      next('last')
    })
}

module.exports = comment

