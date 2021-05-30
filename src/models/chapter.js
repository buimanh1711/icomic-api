const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema

const Chapter = new Schema({
  name: { type: String, maxLength: 255 },
  story: { type: Schema.Types.ObjectId, ref: 'story' },
  content: { type: String, default: 'Đang cập nhật...'},
  text: { type: String, default: "" },
  slug: { type: String, slug: 'name' }
}, {
  timestamps: true
})

module.exports = mongoose.model('chapter', Chapter)