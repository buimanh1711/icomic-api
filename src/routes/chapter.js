const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const create = require('../api/chapter/create')
const getAll = require('../api/chapter/getAll')
const update = require('../api/chapter/update')
const remove = require('../api/chapter/delete')
const getOne = require('../api/chapter/getOne')

router.delete('/:_id/:storyId', auth, remove)
router.put('/:_id', auth, update)
router.post('/', auth, create)
router.get('/:_id', getOne)
router.get('/', getAll)

module.exports = router
