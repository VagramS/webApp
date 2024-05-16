const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const Login = async (req, res) => {
    // #swagger.tags = ['Admin / Auth']
    // #swagger.description = 'Secure login system for admin users.'
    // #swagger.summary = 'Admin login'
    res.send('Admin login');
};

module.exports = {Login};