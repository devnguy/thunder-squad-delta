// Generic customer error base class
class ApplicationError extends Error {
  constructor(message, statusCode) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'Something went wrong. Please try again.'
    this.statusCode = statusCode || 500
    this.status = false
    this.id = null
  }
}

class UserNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No user with this user_id exists', 404)
  }
}

class InvalidPasswordError extends ApplicationError {
  constructor(message) {
    super(message || 'Invalid password', 401)
  }
}

class InvalidEmailError extends ApplicationError {
  constructor(message) {
    super(message || 'No user with that email exists', 404)
  }
}

class SwapNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No swap with this swap_id exists', 404)
  }
}

class SwapInProgressError extends ApplicationError {
  constructor(message) {
    super(message || 'It is too late to remove the swap.', 405)
  }
}

class BookNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No book with this book_id exists', 404)
  }
}

class GoogleBookNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'The author/title combination did not match any books', 404)
  }
}


class WishlistItemNotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'No wishlist item with this wish_id exists', 404)
  }
}

class MissingAttributeError extends ApplicationError {
  constructor(message) {
    super(message || 'The request is object missing at least one of the required attributes', 400)
  }
}

class DatabaseError extends ApplicationError {
  constructor(message) {
    super(message, 500)
  }
}

module.exports = {
  UserNotFoundError,
  SwapNotFoundError,
  SwapInProgressError,
  BookNotFoundError,
  GoogleBookNotFoundError,
  WishlistItemNotFoundError,
  MissingAttributeError,
  DatabaseError,
  InvalidPasswordError,
  InvalidEmailError,
}
