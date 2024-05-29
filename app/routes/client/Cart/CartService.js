const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

// to finish (add quantity output)
const ShowCart = async (req, res) => { 
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    // #swagger.summary = 'Show the cart'
    // #swagger.security = []

    const id = req.params.tableid;
    const cart = await schemas.Cart.findOne({table_id: id});

    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart ${id} not found`);
    
    // Extract meal_ids from cart_items
    const meal_ids = cart.cart_items.map(item => item.meal_id);

    if(meal_ids.length == 0)
        return res.status(200).send({message: 'Cart is empty'});
    else {
        // Find all meals that have a meal_id in meal_ids
        meals = await schemas.Meal.find(({id: {$in: meal_ids}}), {_id: 0, name: 1, quantity: 1, price: 1, toppings: 1});
    }
       
    res.status(200).send({message: 'Cart items showed', meals, total_cost: cart.total_cost});
};


const DisplayTotalCost = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    // #swagger.summary = 'Display the total cost'
    // #swagger.security = []

    const id = req.params.tableid;
    const cart = await schemas.Cart.findOne({table_id: id});

    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart ${id} not found`);
    
    const meal_ids = cart.cart_items.map(item => item.meal_id);

    if(meal_ids.length == 0)
        return res.status(200).send({message: 'Cart is empty'});
    else {
        const meals = await schemas.Meal.find({id: {$in: meal_ids}});
        Total = meals.reduce((sum, meal) => {
            // Find the cart item for this meal
            const cartItem = cart.cart_items.find(item => item.meal_id === meal.id);
            // Add the cost of this meal to the sum
            return sum + (meal.price * cartItem.quantity);
        }, 0);
    }

    res.status(200).send({message: 'Total cost showed and saved', Total});
};

// to finish
const AddToCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.summary = 'Add a product to the cart'
    // #swagger.security = []
    
    const mealid = req.params.mealid;
    const tableid = req.params.tableid;
    const {quantity, comment} = req.body;

    const cart = await schemas.Cart.findOne({table_id: tableid});
    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart not found`);
    else {
        const meal = await schemas.Meal.findOne({id: mealid});
        if(!meal)
            throw new NotFoundError('Not Found Error', `Meal not found`);
        else {
            const cartItem = cart.cart_items.find(item => item.meal_id === meal.id);
            if(cartItem)
                cartItem.quantity += quantity;
            else
                cart.cart_items.push({meal_id: meal.id, quantity, comment});
        }
    }

    res.status(200).send({message: 'Product added to cart', meal});
};

// to finish
const Update = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to update the cart by adjusting the quantity of a product or adding a comment.'
    // #swagger.summary = 'Update the cart'
    // #swagger.security = []

    const id = req.params.tableid;
    const {meal_id, quantity, comment} = req.body;
    const cart = await schemas.Cart.findOne({table_id: id});

    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart not found`);
    else {
        const meals = await schemas.Meal.find({id: {$in: cart.cart_items.map(item => item.meal_id)}});
        const meal = meals.find(cartItem => cartItem.id.toString() === meal_id);
        if(!meal)
            throw new NotFoundError('Not Found Error', `Meal not found`);

        if(quantity)
            meal.quantity = quantity;
        if(meal.quantity == 0)
            deleted_meal = await cart_items.deleteOne({meal_id: meal_id});
        if(comment)
            meal.comment = comment;
    }    
    await cart.save();

    res.status(200).send({message: 'Product updated', deleted_meal});
};


// to finish
const DeleteFromCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.summary = 'Remove a product from the cart'
    // #swagger.security = []

    const id = req.params.productId;
    const meal = await schemas.Cart.findOne({meal: id});

    if(!meal)
        throw new NotFoundError('Not Found Error', `Product ${meal.name} not found`);
    else
        await meal.deleteOne();

    res.status(200).send({message: 'Product deleted from the cart', product});
};

module.exports = {
    AddToCart,
    ShowCart,
    DeleteFromCart,
    Update,
    DisplayTotalCost,
};