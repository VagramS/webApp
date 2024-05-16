const schemas = require('../../../Utils/db/Schemas.js');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const DisplayProductById = async (req, res, next) => {
    // #swagger.tags = ["Client / Product"]
    // #swagger.description = "Display detailed information about a selected meal."
    // #swagger.parameters['productId'] = {description: 'Product ID'}
    res.send('Product details');
};

module.exports = {
    DisplayProductById
};