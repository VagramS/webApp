const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const AddNewMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to add a new meal'
    // #swagger.summary = 'Add a new meal'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    
    const {id, name, description, price, image_url, categoryId, nutrition_info, is_active} = req.body;
    if(!id || !name || !price || !categoryId || !image_url || !nutrition_info || !description) 
        throw new BadRequestError('Invalid input', 'All fields are required');

    if(id < 0) 
        throw new BadRequestError('Invalid input', 'Meal ID must be a positive number');

    const meal = new schemas.Meal({id, name, description, price, image_url, categoryId, nutrition_info, is_active});
    if(await schemas.Meal.findOne({id: id}))
        throw new ConflictError('Conflict', 'A meal with the same ID already exists');

    await meal.save();

    res.status(200).send({message: 'The meal added', meal});
};

const UpdateMeal = async (req, res) => { 
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to update a meal'
    // #swagger.summary = 'Update a meal'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    const mealId = req.params.mealid;
    const {name, description, price, image_url, categoryId, nutrition_info, is_active, toppings} = req.body;
    const meal = await schemas.Meal.findOne({id: mealId});
    if(!meal) 
        throw new NotFoundError('Not found', 'Meal not found');
    if(name) meal.name = name;
    if(description) meal.description = description;
    if(price) meal.price = price;
    if(image_url) meal.image_url = image_url;
    if(categoryId) meal.category_id = categoryId;
    if(nutrition_info) meal.nutrition_info = nutrition_info;
    if(is_active) meal.is_active = is_active;
    if(toppings) meal.toppings = toppings;

    await meal.save();

    res.status(200).send({message: 'The meal updated', meal});
};

const DeleteMeal = async (req, res) => {
    // #swagger.tags = ['Admin / Meal Manager']
    // #swagger.description = 'Allow admin to delete a meal'
    // #swagger.summary = 'Delete a meal'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    const mealId = req.params.mealid;
    const meal = await schemas.Meal.findOne({id: mealId});
    if(!meal) 
        throw new NotFoundError('Not found', 'Meal not found');    
    else
        await schemas.Meal.deleteOne({id: mealId});
    
    res.status(200).send({message: 'The meal deleted', meal});
};

module.exports = {
    AddNewMeal,
    UpdateMeal,
    DeleteMeal
};