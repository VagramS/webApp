const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} = require('../Errors/index');
const logger = require('../client/logger');

// Error handler middleware.
const ErrorHandlerMiddleware = (error, req, res) => {
  if (error instanceof BadRequestError || error instanceof ConflictError
    || error instanceof ForbiddenError || error instanceof InternalServerError
    || error instanceof NotFoundError
    || error instanceof UnauthorizedError) {
    logger.error(error.message);
    res.status(error.statusCode).send({ ...error });
  } else {
    logger.error(error.message);
    res.status(500).send({ statusCode: 500, message: 'Server error occured. Try again later.', error: error.message });
  }
};

module.exports = ErrorHandlerMiddleware;
