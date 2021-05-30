const StoryModel = require('../../models/story')

const getOne = (req, res, next) => {
    const { _id } = req.params

    StoryModel.findOne({ _id })
        .populate('comments.author', 'image _id fullName')
        .populate('follows.author', 'image _id fullName')
        .populate('categories.category')
        .populate('author', 'image _id fullName')
        .populate('chapters.chapter', '_id name createdAt')
        .then(resData => {
            if (resData) {
                res.json({
                    status: true,
                    story: resData
                })
            } else {
                req.err = 'Không tìm thấy truyện!'
                next('last')
            }
        })
}

module.exports = getOne