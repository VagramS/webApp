const BaseError = require('./BaseError');

class UnauthorizedError extends BaseError{
    constructor(message, data){
        super(401, message, data);
    }
}

module.exports = UnauthorizedError;