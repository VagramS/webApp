const BaseError = require('./BaseError');

class ConflictError extends BaseError {
  constructor(message, data) {
    super(409, message, data);
  }
}

module.exports = ConflictError;
