const StoryModel = require('../../models/story')
const AccountModel = require('../../models/account')

const unfollow = (req, res, next) => {
  const { _id, authorId } = req.params
  const { userId, userRole } = req

  if (userRole !== 'admin' && userId !== authorId) {
    req.err = "Không có quyền!"
    return next('last')
  }

  StoryModel.updateOne({
    _id
  }, {
    $pull: {
      follows: { author: authorId }
    }
  })
    .then(resData => {
      if (resData) {
        AccountModel.findOneAndUpdate({
          _id: authorId
        }, {
          $pull: {
            following: { story: _id }
          }
        })
          .then((resData2) => {
            if (resData2) {
              res.json({
                status: true,
                message: 'unfollow truyện hàng thành công!'
              })
            }
          })
      } else {
        req.err = 'Lỗi unfollow!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi unfollow! ' + err
      next('last')
    })
}

module.exports = unfollow