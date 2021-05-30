const ChapterModel = require('../../models/chapter')

const getOne = (req, res, next) => {
  const { _id } = req.params

  ChapterModel.findOne({
    _id: _id
  })
    .populate('story', 'title _id')
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          chapter: resData
        })
      } else {
        req.err = 'lấy chapter thất bại!'
        console.log(err)
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy chapter! ' + err
      next('last')
    })

}

module.exports = getOne