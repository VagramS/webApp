const BaseError = require('./BaseError');

class InternalServiceError extends BaseError {
  constructor(message, data) {
    super(500, message, data);
  }
}

module.exports = InternalServiceError;
