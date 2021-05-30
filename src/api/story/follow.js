const StoryModel = require('../../models/story')
const AccountModel = require('../../models/account')

const follow = (req, res, next) => {
  const { _id } = req.params
  const { userId } = req

  StoryModel.updateOne({
    _id
  }, {
    $push: {
      follows: { author: { _id: userId } }
    }
  })
    .then(resData => {
      if (resData) {
        AccountModel.findOneAndUpdate({
          _id: userId
        }, {
          $push: {
            following: { story: _id }
          }
        })
          .then((resData2) => {
            if (resData2) {
              res.json({
                status: true,
                message: 'follow truyện hàng thành công!'
              })
            }
          })
      } else {
        req.err = 'Lỗi follow!'
        return next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi follow! ' + err
      next('last')
    })
}

module.exports = follow