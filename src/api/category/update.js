const CategoryModel = require('../../models/category')

const update = (req, res, next) => {
  const { _id } = req.params
  const data = req.body
  const { userRole } = req

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }

  CategoryModel.findOneAndUpdate({
    _id: _id
  }, data, { new: true})
    .then(resData => {
      if (resData) {
        res.json({
          status: true,
          message: "Cập nhật chuyên mục thành công!",
          newCategory: resData
        })
      } else {
        req.err = 'Lỗi cập nhật category!'
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi cập nhật category! ' + err
      next('last')
    })

}

module.exports = update