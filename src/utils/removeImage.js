const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'mb1o4er',
  api_key: '474388122655297',
  api_secret: 't2HuCUQHsMtyYtbZHwQXdSJme70'
})

const removeImage = (publicId, option, callback) => {
  return cloudinary.api.delete_resources(publicId, callback)
}

module.exports = removeImage
