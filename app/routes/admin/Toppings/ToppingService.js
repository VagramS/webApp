const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const CreateTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to create add-on/toppings options'
    // #swagger.summary = 'Create a new topping'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    const {id, name, price} = req.body;
    if(!id, !name || !price)
        throw new BadRequestError('Invalid input', 'ID, Name and price are required');

    const topping = new schemas.Topping({id, name, price});

    if(await schemas.Topping.findOne({id}))
        throw new ConflictError('Conflict', 'Topping id already exists');
    if(await schemas.Topping.findOne({name}))
        throw new ConflictError('Conflict', 'Topping name already exists');

    await topping.save();

    res.status(200).send({message: 'Topping created', topping});
};

const UpdateTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to update add-on/toppings options'
    // #swagger.summary = 'Update a topping'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    const toppingid = req.params.toppingid;
    const {name, price} = req.body;
    const topping = await schemas.Topping.findOne({id: toppingid});
    if(!topping)
        throw new NotFoundError('Not found', 'Topping not found');
    if(name) topping.name = name;
    if(price) topping.price = price;

    await topping.save();

    res.status(200).send({message: 'Topping updated', topping});
};

const DeleteTopping = async (req, res) => {
    // #swagger.tags = ['Admin / Toppings']
    // #swagger.description = 'Allow admin to delete add-on/toppings options'
    // #swagger.summary = 'Delete a topping'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    const toppingid = req.params.toppingid;
    const topping = await schemas.Topping.findOne({id: toppingid});
    if(!topping)
        throw new NotFoundError('Not found', 'Topping not found');
    else
        await schemas.Topping.deleteOne({id: toppingid});

    res.status(200).send({message: 'Topping deleted', topping});
};

module.exports = {
    CreateTopping,
    UpdateTopping,
    DeleteTopping
};