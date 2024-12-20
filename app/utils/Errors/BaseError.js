class BaseError extends Error {
  constructor(statusCode, message, data) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = BaseError;
