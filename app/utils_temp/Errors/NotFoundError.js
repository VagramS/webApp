const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(message, data) {
    super(404, message, data);
  }
}

module.exports = NotFoundError;
