const schemas = require('../../../Utils/db/Models');
const { BadRequestError, ConflictError, NotFoundError } = require('../../../Utils/Errors/index');

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
    throw new NotFoundError('Not Found Error', 'Topping not found');
  if (name) topping.name = name;
  if (price) topping.price = price;

  await topping.save();

  res.status(200).send({ message: 'Topping updated', topping });
};

const DeleteTopping = async (req, res) => {
  // #swagger.tags = ['Admin / Toppings']
  // #swagger.description = 'Allow admin to delete add-on/toppings options'
  // #swagger.summary = 'Delete a topping'
  // #swagger.security = [{ "Bearer": [] }]

  const { toppingid } = req.params;
  const topping = await schemas.Topping.findOne({ id: toppingid });
  if (!topping)
    throw new NotFoundError('Not Found Error', 'Topping not found');
  else
    await schemas.Topping.deleteOne({ id: toppingid });

  res.status(200).send({ message: 'Topping deleted', topping });
};

module.exports = {
  CreateTopping,
  UpdateTopping,
  DeleteTopping,
};
