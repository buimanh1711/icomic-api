const ChapterModel = require('../../models/chapter')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 8

const getAll = (req, res, next) => {
  const { page, story, search, sort } = req.query
  if (!story) {
    req.err = 'Yêu cầu không hợp lệ!'
    return next('last')
  }
  const query = {
    story
  }

  const { skip, limit } = getPage(page, PAGE_SIZE)
  if (search && search !== 'null') query.text = { $regex: search, $options: 'gi'}

  ChapterModel.find(query)
    .populate('story')
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .then(resData => {
      if (resData) {
        ChapterModel.countDocuments(query)
          .then(count => {
            if (count || count === 0) {
              res.json({
                status: true,
                message: 'Lấy Chapter thành công!',
                currentPage: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                chapters: resData
              })
            }
          })
      } else {
        req.err = 'Lỗi lấy chapter!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi lấy chapter ' + err
      next('last')
    })
}

module.exports = getAll