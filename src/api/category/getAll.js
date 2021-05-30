const CategoryModel = require('../../models/category')

const getAll = (req, res, next) => {
  CategoryModel.find({})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: 'Lấy chuyên mục thành công!',
          categories: resData
        })
      } else {
        req.err = 'Lấy chuyên mục thất bại!'
        next('last')
      }
    })
}

module.exports = getAll