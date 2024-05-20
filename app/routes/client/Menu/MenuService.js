const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const DisplayCategories = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available categories (Snacks, Salads, Main, Drinks… etc).'
    // #swagger.summary = 'Display all categories'
    // #swagger.security = []

    const categories = await schemas.MenuCategory.find();
    if(!categories)
        throw new NotFoundError('Not found', 'Categories not found');
    
    res.status(200).send({message: 'All the categories showed', categories});
};

const DisplayMeals = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available meals grouped by categories.'
    // #swagger.summary = 'Display all meals'
    // #swagger.security = []
    
    let meals = await schemas.Meal.find({}, {name: 1, description: 1, price: 1, image_url: 1, _id: 0});
    if(!meals)
        throw new NotFoundError('Not found', 'Meals not found');

    res.status(200).send({message: 'All the meals showed', meals});
};

const FilterByCategory = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to filter meals by category.'
    // #swagger.summary = 'Filter meals by category'
    // #swagger.security = []
    
    const categoryId = req.params.categoryid;
    const meals = await schemas.Meal.find({category_id: categoryId }, {name: 1, description: 1, price: 1, image_url: 1, _id: 0});
    
    const category = await schemas.MenuCategory.findOne({id: categoryId});
    if(!category)
        throw new NotFoundError('Not found', `Category with id ${categoryId} not found`);

    res.status(200).send({message: 'All the meals showed', meals})
};

const ViewDetailsById = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to view details of a specific meal.'
    // #swagger.summary = 'View meal details'
    // #swagger.security = []

    const mealId = req.params.mealid;
    const meal = await schemas.Meal.findOne({id: mealId});
    if(!meal)
        throw new NotFoundError('Not found', `Meal with id ${mealId} not found`);
    
    res.status(200).send({message: 'All details about the meal showed', meal})
};


module.exports = {
    DisplayCategories,
    DisplayMeals,
    FilterByCategory,
    ViewDetailsById
};

