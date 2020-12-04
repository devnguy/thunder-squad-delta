const fetch = require('cross-fetch')

const formatBooks = require('./util/formatGoogleBooks')
const { ApplicationError, GoogleBookNotFoundError, MissingAttributeError } = require('../errors')

// Get all google books that relate to the supplied keyword header.
exports.getGoogleBooks = async function (req, response, next) {
  try {
    // Only process query  if title and author are present
    if (!req.params.title || !req.params.author) throw new MissingAttributeError()
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const q = 'intitle:' + req.params.title + '+inauthor:' + req.params.author
    const path = url + q

    const res = await fetch(path)
    if (response.status >= 400) {
      throw new ApplicationError()
    }
    const books = await res.json()
  
    return response.status(200).json(formatBooks(books))

  } catch (error) {
    return next(error)
  }
}
