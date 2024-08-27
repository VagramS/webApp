const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const CreateMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Create a menu category'
    // #swagger.summary = 'Create a menu category'
    // #swagger.security = [{ "Bearer": [] }]

    const {id, name, description} = req.body;
    if(!name || !id) 
        throw new BadRequestError('Bad Request Error', 'Category id and name is required');

    const category = new schemas.MenuCategory({id, name, description});

    if(await schemas.MenuCategory.findOne({id}))
        throw new ConflictError('Conflict Error', 'Category id exists');

    if(await schemas.MenuCategory.findOne({name}))
        throw new ConflictError('Conflict Error', 'Category name exists');

    await category.save();

    res.status(200).send({message: 'Menu Category created', category});
};

const UpdateMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Update a menu category'
    // #swagger.summary = 'Update a menu category' 
    // #swagger.security = [{ "Bearer": [] }]

    const categoryid = req.params.categoryid;
    const {name, description} = req.body;
    const category = await schemas.MenuCategory.findOne({id : categoryid});

    if(!category) 
        throw new NotFoundError('Not Found Error', 'Category not found');
    if(name) {
        if(await schemas.MenuCategory.findOne({name}))
            throw new ConflictError('Conflict Error', 'Category name exists');
        category.name = name;
    }
    if(description) 
        category.description = description;
    await category.save();
    
    res.status(200).send({message: 'Menu Category updated', category});
};

const DeleteMenuCategory = async (req, res) => {
    // #swagger.tags = ['Admin / Menu Manager']
    // #swagger.description = 'Delete a menu category'
    // #swagger.summary = 'Delete a menu category'
    // #swagger.security = [{ "Bearer": [] }]
    
    const categoryid = req.params.categoryid;
    const category = await schemas.MenuCategory.findOne({id: categoryid});
    if(!category) 
        throw new NotFoundError('Not Found Error', 'Category not found');    
    else
        await schemas.MenuCategory.deleteOne({id: categoryid});

    res.status(200).send({message: 'Menu Category deleted', category});
};

module.exports = {
    CreateMenuCategory,
    UpdateMenuCategory,
    DeleteMenuCategory
};