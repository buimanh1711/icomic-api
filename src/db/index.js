const mongoose = require('mongoose')

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://mb1o4er:20011004@cluster0.mzny3.mongodb.net/stories_production?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('connect db successfully!')
  } catch(error) {
    console.log(error)
    console.log('connect db failed!')
  }
}

module.exports = { connect }