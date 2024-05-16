const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const CreateTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to create add-on/toppings options'
    // #swagger.summary = 'Create a new topping'
    res.send('Create a new topping');
};

const UpdateTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to update add-on/toppings options'
    // #swagger.summary = 'Update a topping'
    res.send('Update a topping');
};

const DeleteTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to delete add-on/toppings options'
    // #swagger.summary = 'Delete a topping'
    res.send('Delete a topping');
};

module.exports = {
    CreateTopping,
    UpdateTopping,
    DeleteTopping
};