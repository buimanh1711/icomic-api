const CategoryModel = require('../../models/category')

const remove = (req, res, next) => {
  const { _id } = req.params
  const { userRole } = req

  if (userRole !== 'admin') {
    req.err = 'Bạn không có quyền!'
    return next('last')
  }
  
  CategoryModel.deleteOne({
    _id: _id
  })
    .then(resData => {
      if (resData) {
        res.json({
          status: true
        })
      } else {
        req.err = "Không thể xóa"
        next('last')
      }
    })
    .catch(err => {
      req.err = 'Lỗi xóa category! ' + err
      next('last')
    })

}

module.exports = remove