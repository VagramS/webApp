const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const Login = async (req, res, next) => {
    // #swagger.tags = ['Admin / Auth']
    // #swagger.description = 'Secure login system for admin users.'
    // #swagger.summary = 'Admin login'
    res.send('Admin login');
};

module.exports = {Login};