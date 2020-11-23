/**
 * Middleware that should get called when an error is thrown. Returns the
 * appropriate status code and message based on the error.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack)
  return res
    .status(err.statusCode || 500)
    .json({ status: err.status, id: err.id, msg: err.message })
}

module.exports = errorHandler
