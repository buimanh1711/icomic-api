const express = require('express')
const create = require('../api/category/create')
const remove = require('../api/category/delete')
const getAll = require('../api/category/getAll')
const update = require('../api/category/update')
const auth = require('../middlewares/auth')
const router = express.Router()

router.delete('/:_id', auth, remove)
router.put('/:_id', auth, update)
router.post('/', auth, create)
router.get('/', getAll)

module.exports = router