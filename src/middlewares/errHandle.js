const errHandle = (error, req, res, next) => {
  const { err } = req
  console.log(`Error: ${err}`)
  res.json({
    status: false,
    message: err,
    error: error
  })
}

module.exports = errHandle
