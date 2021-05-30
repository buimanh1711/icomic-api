const CategoryModel = require('../../models/category')
const toSlug = require('../../utils/toSlug')

const create = (req, res, next) => {
  const data = req.body
  const { userRole } = req

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  CategoryModel.findOne({
    slug: toSlug(data.title)
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: false,
          message: 'Chuyên mục đã tồn tại!',
        })
      } else {
        const newCategory = new CategoryModel(data)
        newCategory.save(err => {
          if (err === null) {
            res.json({
              status: true,
              message: 'Tạo chuyên mục thành công!',
              newCategory: newCategory
            })
          } else {
            req.err = 'Lỗi tạo chuyên mục: ' + err
            next('last')
          }
        })
      }
    })
}

module.exports = create