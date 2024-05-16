const schemas = require('../../../Utils/db/Schemas.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const DisplayProductById = async (req, res) => {
    // #swagger.tags = ["Client / Product"]
    // #swagger.description = "Display detailed information about a selected meal."
    // #swagger.parameters['productId'] = {description: 'Product ID'}
    // #swagger.summary = 'Display product details'
    res.send('Product details');
};

module.exports = {
    DisplayProductById
};