const ChapterModel = require('../../models/chapter')
const StoryModel = require('../../models/story')

const remove = (req, res, next) => {
  const { _id, storyId } = req.params

  ChapterModel.deleteOne({
    _id: _id
  })
    .then(resData => {
      if (resData) {
        StoryModel.findByIdAndUpdate({
          _id: storyId
        }, {
          createdAt: Date.now(),
          $pull: {
            chapters: { chapter: _id }
          }
        })
          .then(resData2 => {
            if (resData2) {
              res.json({
                status: true
              })
            } else {
              req.err = 'Xoá chapter thất bại!'
              console.log(err)
              next('last')
            }
          })
      } else {
        req.err = "Không thể xóa"
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa chapter! ' + err
      next('last')
    })

}

module.exports = remove