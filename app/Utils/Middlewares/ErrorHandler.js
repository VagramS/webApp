const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../Errors/index');

const errors = [
    BadRequestError,
    ConflictError, 
    ForbiddenError, 
    InternalServerError, 
    NotFoundError, 
    UnauthorizedError
];

// Description: Error handler middleware.
const ErrorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof BadRequestError || error instanceof ConflictError || error instanceof ForbiddenError || error instanceof InternalServerError || error instanceof NotFoundError || error instanceof UnauthorizedError)
        res.status(error.statusCode).send({...error});
      
    else 
        res.status(500).send({ statusCode: 500, message: 'Server error occured. Try again later.' });
};

module.exports = ErrorHandlerMiddleware;