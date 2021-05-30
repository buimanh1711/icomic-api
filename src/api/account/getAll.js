const AccountModel = require('../../models/account')
const getPage = require('../../utils/getPage')
const PAGE_SIZE = 8

const getAll = (req, res, next) => {
  const { page, search } = req.query || 1

  const { skip, limit } = getPage(page, PAGE_SIZE)
  const query = {}
  query.role = 'staff'
  if (search && search !== 'null') query.text = { $regex: search, $options: 'gi'}

  AccountModel.find(query)
    .skip(skip)
    .limit(limit)
    .then(resData => {
      if (resData) {
        AccountModel.countDocuments(query)
          .then(count => {
            if (count || count === 0) {
              res.json({
                status: true,
                message: 'Lấy người dùng thành công!',
                staffs: resData,
                currentPage: parseInt(page),
                totalPage: Math.ceil(count / PAGE_SIZE),
                totalStaffs: count
              })
            } else {
              req.err = 'Lỗi lấy người dùng!'
              next('last')
            }
          })
      } else {
        req.err = 'Lỗi lấy người dùng!'
        next('last')
      }
    })
    .catch(err => {
      req.err = `Lỗi lấy người dùng! + ${err}`
      next('last')
    })
}

module.exports = getAll