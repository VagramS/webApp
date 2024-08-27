const BaseError = require('./BaseError');

class ForbiddenError extends BaseError{
    constructor(message, data){
        super(403, message, data)
    }
}

module.exports = ForbiddenError;