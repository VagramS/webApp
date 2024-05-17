const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const AddNewMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to add a new meal'
    // #swagger.summary = 'Add a new meal'
    const {name, description, price, image_url, categoryId, nutrition_info, is_active} = req.body;
    if(!name || !price || !categoryId || !is_active || !image_url || !nutrition_info || !description) 
        throw new BadRequestError('Invalid input', 'All fields are required');

    const meal = new schemas.Meal({name, description, price, image_url, categoryId, nutrition_info, is_active});
    await meal.save();

    res.status(200).send({message: 'The meal was added', meal});
};

const UpdateMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update a meal'
    // #swagger.summary = 'Update a meal'
    res.send('Update a meal');
};

const DeleteMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to delete a meal'
    // #swagger.summary = 'Delete a meal'
    res.send('Delete a meal');
};

const UpdateMealStatus = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update meal status'
    // #swagger.summary = 'Update meal status'
    res.send('Update meal status');
};

module.exports = {
    AddNewMeal,
    UpdateMeal,
    DeleteMeal,
    UpdateMealStatus
};