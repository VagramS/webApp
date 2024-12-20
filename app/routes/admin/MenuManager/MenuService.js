const redisClient = require('../../../utils/client/redisClient');
const schemas = require('../../../utils/db/Models');
const { BadRequestError, ConflictError, NotFoundError } = require('../../../utils/Errors/index');

const CreateMenuCategory = async (req, res) => {
  // #swagger.tags = ['Admin / Menu Manager']
  // #swagger.description = 'Create a menu category'
  // #swagger.summary = 'Create a menu category'
  // #swagger.security = [{ "Bearer": [] }]

  const { id, name, description } = req.body;
  if (!name || !id)
    throw new BadRequestError('Bad Request Error', 'Category id and name is required');

  const category = new schemas.MenuCategory({ id, name, description });

  if (await schemas.MenuCategory.findOne({ id }))
    throw new ConflictError('Conflict Error', 'Category id exists');

  if (await schemas.MenuCategory.findOne({ name }))
    throw new ConflictError('Conflict Error', 'Category name exists');

  await category.save();

  // Clear the cache
  await redisClient.del('ByCategory');
  await redisClient.del('AllCategories');

  res.status(200).send({ message: 'Menu Category created', category });
};

const UpdateMenuCategory = async (req, res) => {
  // #swagger.tags = ['Admin / Menu Manager']
  // #swagger.description = 'Update a menu category'
  // #swagger.summary = 'Update a menu category'
  // #swagger.security = [{ "Bearer": [] }]

  const { categoryid } = req.params;
  const { name, description } = req.body;
  const category = await schemas.MenuCategory.findOne({ id: categoryid });

  if (!category)
    throw new NotFoundError('Not Found Error', 'Category not found');
  if (name) {
    if (await schemas.MenuCategory.findOne({ name }))
      throw new ConflictError('Conflict Error', 'Category name already exists');
    category.name = name;
  }
  if (description)
    category.description = description;

  await category.save();

  // Clear the cache
  await redisClient.del('ByCategory');
  await redisClient.del('AllCategories');

  res.status(200).send({ message: 'Menu Category updated', category });
};

const DeleteMenuCategory = async (req, res) => {
  // #swagger.tags = ['Admin / Menu Manager']
  // #swagger.description = 'Delete a menu category'
  // #swagger.summary = 'Delete a menu category'
  // #swagger.security = [{ "Bearer": [] }]

  const { categoryid } = req.params;
  const category = await schemas.MenuCategory.findOne({ id: categoryid });
  if (!category)
    throw new NotFoundError('Not Found Error', 'Category not found');
  else
    await schemas.MenuCategory.deleteOne({ id: categoryid });

  // Clear the cache
  await redisClient.del('ByCategory');
  await redisClient.del('AllCategories');

  res.status(200).send({ message: 'Menu Category deleted', category });
};

module.exports = {
  CreateMenuCategory,
  UpdateMenuCategory,
  DeleteMenuCategory,
};
