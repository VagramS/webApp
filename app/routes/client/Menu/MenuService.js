const redisClient = require('../../../utils/client/redisClient');
const schemas = require('../../../utils/db/Models');
const { NotFoundError } = require('../../../utils/Errors/index');

const DisplayCategories = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Display all available categories (Snacks, Salads, Main, Drinks… etc).'
  // #swagger.summary = 'Display all categories'
  // #swagger.security = []

  const cacheKey = 'AllCategories';

  // Check if data is in Redis cache
  const cachedCategories = await redisClient.get(cacheKey);

  // If cached data exists, parse and return it
  if (cachedCategories) 
    return res.status(200).send({ message: 'All categories (from cache)', categories: JSON.parse(cachedCategories) });

  // If no cache, fetch data from the database
  const categories = await schemas.MenuCategory.find();
  if (!categories)
    throw new NotFoundError('Not Found Error', 'Categories not found');

  // Store data in Redis with an expiration time (e.g., 86400 seconds = 1 day)
  await redisClient.set(cacheKey, JSON.stringify(categories), {
    EX: 86400,
  });

  res.status(200).send({ message: 'All the categories showed', categories });
};

const DisplayMeals = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Display all available meals grouped by categories.'
  // #swagger.summary = 'Display all meals'
  // #swagger.security = []

  const cacheKey = 'AllMeals';

  // Check if data is in Redis cache
  const cachedMeals = await redisClient.get(cacheKey);

  // If cached data exists, parse and return it
  if (cachedMeals) 
    return res.status(200).send({ message: 'All the meals by categories (from cache)', meals: JSON.parse(cachedMeals) });

  // If no cache, fetch data from the database
  const meals = await schemas.Meal.aggregate([
    {
      $lookup: {
        from: 'menucategories', // This should match the MongoDB collection name for MenuCategories
        localField: 'category_id',
        foreignField: 'id',
        as: 'category_info',
      },
    },
    {
      $unwind: '$category_info', // Unwind the array to simplify the data structure if each meal has only one category
    },
    {
      $group: {
        _id: '$category_info.name', // Group by category name instead of category_id
        meals: {
          $push: {
            name: '$name',
            description: '$description',
            price: '$price',
            image_url: '$image_url',
          },
        },
      },
    },
  ]);

  if (!meals || meals.length === 0)
    throw new NotFoundError('Not Found Error', 'Meals not found');

  // Store data in Redis with an expiration time (e.g., 86400 seconds = 1 day)
  await redisClient.set(cacheKey, JSON.stringify(meals), {
    EX: 86400,
  });

  res.status(200).send({ message: 'All the meals by categories', meals });
};

const FilterByCategory = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Allow users to filter meals by category.'
  // #swagger.summary = 'Filter meals by category'
  // #swagger.security = []

  const cacheKey = 'ByCategory';

  // Check if data is in Redis cache
  const cachedByCategory = await redisClient.get(cacheKey);

  // If cached data exists, parse and return it
  if (cachedByCategory) 
    return res.status(200).send({ message: 'All the meals in the category (from cache)', ByCategory: JSON.parse(cachedByCategory) });

  // If no cache, fetch data from the database
  const categoryId = req.params.categoryid;
  const meals = await schemas.Meal.find({ category_id: categoryId }, {
    name: 1, description: 1, price: 1, image_url: 1, _id: 0,
  });

  const category = await schemas.MenuCategory.findOne({ id: categoryId });
  if (!category)
    throw new NotFoundError('Not Found Error', `Category with id ${categoryId} not found`);

  const ByCategory = meals;

  // Store data in Redis with an expiration time (e.g., 86400 seconds = 1 day)
  await redisClient.set(cacheKey, JSON.stringify(ByCategory), {
    EX: 86400,
  });

  res.status(200).send({ message: 'All the meals in the category', ByCategory });
};

const ViewDetailsById = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Allow users to view details of a specific meal.'
  // #swagger.summary = 'View meal details'
  // #swagger.security = []

  const cacheKey = 'ById';

  // Check if data is in Redis cache
  const cachedById = await redisClient.get(cacheKey);

  // If cached data exists, parse and return it
  if (cachedById) 
    return res.status(200).send({ message: 'All details about the meal (from cache)', ById: JSON.parse(cachedById) });

  // If no cache, fetch data from the database
  const mealId = req.params.mealid;
  const meal = await schemas.Meal.findOne({ id: mealId }, {
    _id: 0, id: 1, name: 1, description: 1, price: 1, image_url: 1,
  });
  if (!meal)
    throw new NotFoundError('Not Found Error', `Meal with id ${mealId} not found`);

  const ById = meal;
  // Store data in Redis with an expiration time (e.g., 86400 seconds = 1 day)
  await redisClient.set(cacheKey, JSON.stringify(ById), {
    EX: 86400,
  });

  res.status(200).send({ message: 'All details about the meal', meal });
};

module.exports = {
  DisplayCategories,
  DisplayMeals,
  FilterByCategory,
  ViewDetailsById,
};
