const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const AddNewMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to add a new meal'
    res.send('Add a new meal');
};

const UpdateMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update a meal'
    res.send('Update a meal');
};

const DeleteMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to delete a meal'
    res.send('Delete a meal');
};

const UpdateMealStatus = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update meal status'
    res.send('Update meal status');
};

module.exports = {
    AddNewMeal,
    UpdateMeal,
    DeleteMeal,
    UpdateMealStatus
};