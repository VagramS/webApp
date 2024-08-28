const redisClient = require('../../../Utils/client/redisClient');
const schemas = require('../../../Utils/db/Models');
const { BadRequestError, ConflictError, NotFoundError } = require('../../../Utils/Errors/index');

const ViewAllToppings = async (req, res) => {
  // #swagger.tags = ['Admin / Toppings']
  // #swagger.description = 'Allow admin to view all the avaliable add-on/toppings options'
  // #swagger.summary = 'View all toppings'
  // #swagger.security = [{ "Bearer": [] }]

  const toppings = await schemas.Topping.find();

  const cacheKey = 'AllToppings';

  // Check if data is in Redis cache
  const cachedToppings = await redisClient.get(cacheKey);

  // If cached data exists, parse and return it
  if (cachedToppings) 
    return res.status(200).send({ message: 'All the topping (from cache)', toppings: JSON.parse(cachedToppings) });

  if (!toppings || toppings.length === 0)
    throw new NotFoundError('Not Found Error', 'No toppings found');

  // Store data in Redis with an expiration time (e.g., 86400 seconds = 1 day)
  await redisClient.set(cacheKey, JSON.stringify(toppings), {
    EX: 86400,
  });

  res.status(200).send({ message: 'All toppings', toppings });
};

const CreateTopping = async (req, res) => {
  // #swagger.tags = ['Admin / Toppings']
  // #swagger.description = 'Allow admin to create add-on/toppings options'
  // #swagger.summary = 'Create a new topping'
  // #swagger.security = [{ "Bearer": [] }]

  const { id, name, price } = req.body;
  if (!id || !name || !price)
    throw new BadRequestError('Bad Request Error', 'ID, Name and price are required');

  const topping = new schemas.Topping({ id, name, price });

  if (await schemas.Topping.findOne({ id }))
    throw new ConflictError('Conflict Error', 'Topping id already exists');
  if (await schemas.Topping.findOne({ name }))
    throw new ConflictError('Conflict Error', 'Topping name already exists');

  await topping.save();

  // Clear the cache
  await redisClient.del('AllToppings');

  res.status(200).send({ message: 'Topping created', topping });
};

const UpdateTopping = async (req, res) => {
  // #swagger.tags = ['Admin / Toppings']
  // #swagger.description = 'Allow admin to update add-on/toppings options'
  // #swagger.summary = 'Update a topping'
  // #swagger.security = [{ "Bearer": [] }]

  const { toppingid } = req.params;
  const { name, price } = req.body;
  const topping = await schemas.Topping.findOne({ id: toppingid });

  if (!topping)
    throw new NotFoundError('Not Found Error', `Topping with ID ${toppingid} not found`);

  if (name) {
    if (await schemas.Topping.findOne({ name }))
      throw new ConflictError('Conflict Error', 'Topping name already exists');
    topping.name = name;
  }

  if (price !== undefined) {
    if (typeof price !== 'number') 
      throw new BadRequestError('Invalid Data', 'Price must be a number');
    topping.price = price; // Correctly assign the price
  }

  await topping.save();

  // Clear the cache
  await redisClient.del('AllToppings');

  res.status(200).send({ message: 'Topping updated', topping });
};

const DeleteTopping = async (req, res) => {
  // #swagger.tags = ['Admin / Toppings']
  // #swagger.description = 'Allow admin to delete add-on/toppings options'
  // #swagger.summary = 'Delete a topping'
  // #swagger.security = [{ "Bearer": [] }]

  const toppingid = req.params.toppingid;

  // Ensure toppingid is a valid number
  if (!toppingid || isNaN(toppingid)) 
    throw new NotFoundError('Invalid ID', 'The provided topping ID is not valid');
  
  // Attempt to find the topping
  const topping = await schemas.Topping.findOne({ id: parseInt(toppingid, 10) });
  if (!topping) 
    throw new NotFoundError('Not Found Error', `Topping with ID ${toppingid} not found`);

  await schemas.Topping.deleteOne({ id: parseInt(toppingid, 10) });

  // Clear the cache
  await redisClient.del('AllToppings');

  res.status(200).send({ message: 'Topping deleted', topping });
};

module.exports = {
  ViewAllToppings,
  CreateTopping,
  UpdateTopping,
  DeleteTopping,
};
