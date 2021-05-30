const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'mb1o4er',
  api_key: '474388122655297',
  api_secret: 't2HuCUQHsMtyYtbZHwQXdSJme70'
})

const uploadImage = (file, option, callback) => {
  return cloudinary.uploader.upload(file, callback)
}

module.exports = uploadImage