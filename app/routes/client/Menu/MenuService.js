const schemas = require("../../../Utils/db/Models.js");
const {NotFoundError} = require("../../../Utils/Errors/index.js");

const DisplayCategories = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Display all available categories (Snacks, Salads, Main, Drinks… etc).'
  // #swagger.summary = 'Display all categories'
  // #swagger.security = []

  const categories = await schemas.MenuCategory.find();
  if (!categories)
    throw new NotFoundError("Not Found Error", "Categories not found");

  res.status(200).send({ message: "All the categories showed", categories });
};

const DisplayMeals = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Display all available meals grouped by categories.'
  // #swagger.summary = 'Display all meals'
  // #swagger.security = []

  let meals = await schemas.Meal.aggregate([
    {
      $lookup: {
        from: "menucategories", // This should match the MongoDB collection name for MenuCategories
        localField: "category_id",
        foreignField: "id",
        as: "category_info",
      },
    },
    {
      $unwind: "$category_info", // Unwind the array to simplify the data structure if each meal has only one category
    },
    {
      $group: {
        _id: "$category_info.name", // Group by category name instead of category_id
        meals: {
          $push: {
            name: "$name",
            description: "$description",
            price: "$price",
            image_url: "$image_url",
          },
        },
      },
    },
  ]);

  if (!meals || meals.length === 0)
    throw new NotFoundError("Not Found Error", "Meals not found");

  res
    .status(200)
    .send({ message: "All the meals by categories showed", meals });
};

const FilterByCategory = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Allow users to filter meals by category.'
  // #swagger.summary = 'Filter meals by category'
  // #swagger.security = []

  const categoryId = req.params.categoryid;
  const meals = await schemas.Meal.find(
    { category_id: categoryId },
    { name: 1, description: 1, price: 1, image_url: 1, _id: 0 },
  );

  const category = await schemas.MenuCategory.findOne({ id: categoryId });
  if (!category)
    throw new NotFoundError(
      "Not Found Error",
      `Category with id ${categoryId} not found`,
    );

  res.status(200).send({ message: "All the meals showed", meals });
};

const ViewDetailsById = async (req, res) => {
  // #swagger.tags = ["Client / Menu"]
  // #swagger.description = 'Allow users to view details of a specific meal.'
  // #swagger.summary = 'View meal details'
  // #swagger.security = []

  const mealId = req.params.mealid;
  const meal = await schemas.Meal.findOne(
    { id: mealId },
    { name: 1, description: 1, price: 1, image_url: 1 },
  );
  if (!meal)
    throw new NotFoundError(
      "Not Found Error",
      `Meal with id ${mealId} not found`,
    );

  res.status(200).send({ message: "All details about the meal showed", meal });
};

module.exports = {
  DisplayCategories,
  DisplayMeals,
  FilterByCategory,
  ViewDetailsById,
};
