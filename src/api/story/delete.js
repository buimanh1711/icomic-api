const StoryModel = require('../../models/story')
const ChapterModel = require('../../models/chapter')
const removeImage = require('../../utils/removeImage')

const remove = (req, res, next) => {
    const { _id } = req.params
    const { userRole } = req
    const image = req.body

    if (userRole !== 'admin') {
        req.err = 'Bạn không có quyền'
        return next('last')
    }

    StoryModel.deleteOne({
        _id
    })
        .then(resData => {
            if (resData) {
                if (image && image.publicId) {
                    removeImage(image.publicId, {}, (err, result) => {
                        if (err) {
                            console.log('Lỗi xóa ảnh!')
                        }
                        if (result) {
                            console.log('Xóa ảnh thành công')
                        }
                    })
                }

                ChapterModel.deleteMany({
                    story: _id
                })
                    .then(resData2 => {
                        if (resData2) {
                            res.json({
                                status: true,
                                message: 'Xóa truyện thành công!'
                            })
                        } else {
                            req.err = "Không thể xóa"
                            next('last')
                        }
                    })
            } else {
                req.err = "Không thể xóa"
                next('last')
            }
        })
        .catch(err => {
            req.err = `Lỗi xóa truyện! + ${err}`
            next('last')
        })

}

module.exports = remove