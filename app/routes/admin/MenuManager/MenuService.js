const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const CreateMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Create a menu category'
    // #swagger.summary = 'Create a menu category'
    res.send('Create a menu category');
};

const UpdateMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Update a menu category'
    // #swagger.summary = 'Update a menu category'
    res.send('Update a menu category');
};

const DeleteMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Delete a menu category'
    // #swagger.summary = 'Delete a menu category'
    res.send('Delete a menu category');
};

module.exports = {
    CreateMenuCategory,
    UpdateMenuCategory,
    DeleteMenuCategory
};