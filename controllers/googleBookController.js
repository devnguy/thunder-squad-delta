const fetch = require('cross-fetch')

const formatBooks = require('./util/formatGoogleBooks')
// Get all google books that relate to the supplied keyword header.

exports.getGoogleBooks = async function (req, response) {
    // Only process query  if title and author are present
    if (!req.params.title || !req.params.author) {
        return response.status(400).json({
            msg: 'The request object is missing at least one of the required attributes',
        })
    }
    try {
        const url = 'https://www.googleapis.com/books/v1/volumes?q='
        const q = 'intitle:' + req.params.title + '+inauthor:' + req.params.author
        const path = url + q

        const res = await fetch(path)
        if (response.status >= 400) {
            throw new Error('Bad response from server')
        }
        const books = await res.json()
      
        // I want to make the commented out call below, but there is an unhandled promise rejection
        return response.status(200).json(formatBooks(books))
        // return response.status(200).json(books)

    } catch (error) {
        console.log(error)
        return response.json(error)
    }
}