const getPage = (page, size) => {
  if (page < 0) return {}
  page = parseInt(page)
  let skip = (page - 1) * size
  let limit = size

  return {
    skip,
    limit
  }
}

module.exports = getPage