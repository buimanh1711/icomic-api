const loginRouter = require('./login')
const authRouter = require('./auth')
const storyRouter = require('./story')
const accountRouter = require('./account')
const chapterRouter = require('./chapter')
const categoryRouter = require('./category')

const route = (app) => {
  app.use('/api/auth', authRouter)
  app.use('/api/stories', storyRouter)
  app.use('/api/categories', categoryRouter)
  app.use('/api/accounts', accountRouter)
  app.use('/api/chapters', chapterRouter)
  app.use('/api/login', loginRouter)
}

module.exports = route