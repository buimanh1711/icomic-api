const ChapterModel = require('../../models/chapter')
const StoryModel = require('../../models/story')

const toSlug = require('../../utils/toSlug')

const create = (req, res, next) => {
  const data = req.body

  ChapterModel.findOne({
    slug: toSlug(data.name),
    story: data.story
  })
    .then(resData => {
      if (resData) {
        req.err = 'chapter đã tồn tại!'
        next('last')
      } else {

        const newData = {
          ...data
        }

        const newChapter = new ChapterModel(newData)
        newChapter.save(err => {
          if (err === null) {
            StoryModel.findByIdAndUpdate({
              _id: data.story
            }, {
              updatedChap: Date.now(),
              $push: {
                chapters: { chapter: newChapter._id }
              }
            })
              .then(resData2 => {
                if (resData2) {
                  res.json({
                    status: true,
                    message: 'Thêm chapter thành công!',
                    newChapter: newChapter
                  })
                } else {
                  req.err = 'Thêm chapter thất bại!'
                  next('last')
                }
              })
          } else {
            req.err = 'Thêm chapter thất bại!'
            next('last')
          }
        })
      }
    })
}

module.exports = create