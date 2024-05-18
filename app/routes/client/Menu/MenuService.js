const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const DisplayCategories = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available categories (Snacks, Salads, Main, Drinks… etc).'
    // #swagger.summary = 'Display all categories'
    try {
        const categories = await schemas.menuCategory.find();
        res.status(200).json({status: 'OK', data: categories});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DisplayMeals = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Display all available meals grouped by categories.'
    // #swagger.summary = 'Display all meals'
    res.send('Meals');
    try {
        const meals = await schemas.meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const FilterByCategory = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to filter meals by category.'
    // #swagger.summary = 'Filter meals by category'
    try {
        const meals = await schemas.meal.find({categoryId: req.params.categoryId});
        res.status(200).json(meals);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ViewDetailsById = async (req, res) => {
    // #swagger.tags = ["Client / Menu"]
    // #swagger.description = 'Allow users to view details of a specific meal.'
    // #swagger.summary = 'View meal details'
    try{
        const meal = await schemas.meal.findById(req.params.mealId);
        if (!meal) {
            throw new NotFoundError('Meal not found');
        }
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    DisplayCategories,
    DisplayMeals,
    FilterByCategory,
    ViewDetailsById
};

