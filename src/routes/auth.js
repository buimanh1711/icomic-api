const express = require('express')
const router = express.Router()

const commonAuth = require('../api/auth')
const auth = require('../middlewares/auth')

router.get('/', auth, commonAuth)

module.exports = router