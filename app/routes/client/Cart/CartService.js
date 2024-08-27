const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const ShowCart = async (req, res) => { 
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    // #swagger.summary = 'Show the cart'
    // #swagger.security = []

    const id = req.params.tableid;
    const cart = await schemas.Cart.findOne({table_id: id});

    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart ${id} not found`);

    if(cart.cart_items.length == 0)
        return res.status(200).send({message: `Cart ${id} is empty`});
    
    const meals = await Promise.all(
        cart.cart_items.map(async (item) => {
            const meal = await schemas.Meal.findOne({ id: item.meal_id }, { _id: 0, id: 1, name: 1, price: 1, toppings: 1, commet: 1 });
            if (meal) {
                return {
                    id: item.meal_id,
                    name: meal.name,
                    quantity: item.quantity, 
                    price: meal.price.toFixed(2),
                    toppings: meal.toppings,
                    comments: item.comments
                };
            }
        })
    );

    const formattedTotalCost = await DisplayTotalCost(meals);
    await cart.save();

    res.status(200).send({message: 'Cart items showed', meals, total_cost: formattedTotalCost});
};


const AddToCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.summary = 'Add a product to the cart'
    // #swagger.security = []
    
    const mealId = req.params.mealid;
    const tableId = req.params.tableid;
    const {quantity, comment} = req.body;

    const parsedQuantity = parseInt(quantity, 10);

    const meal = await schemas.Meal.findOne({ id: mealId});
    if(!meal)
        throw new NotFoundError('Not Found Error', `Meal with ID ${mealId} not found`);

    const cart = await schemas.Cart.findOne({ table_id: tableId });
    if (!cart) 
        throw new NotFoundError('Not Found Error', `Cart for table ${tableId} not found`);
    else {
        const mealIndex = cart.cart_items.findIndex(item => item.meal_id === parseInt(mealId));
        if(mealIndex == -1)
            cart.cart_items.push({meal_id: meal.id, quantity, comment});
        else 
            cart.cart_items[mealIndex].quantity += parsedQuantity;

        await cart.save();
    }
    
    res.status(200).send({message: 'Product added to cart', meal});
};


const UpdateCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to update the cart by adjusting the quantity of a product or adding a comment.'
    // #swagger.summary = 'Update the cart'
    // #swagger.security = []

    const tableId = req.params.tableid;
    const {mealId, quantity, comment} = req.body;

    const parsedQuantity = parseInt(quantity, 10);

    const meal = await schemas.Meal.findOne({ id: mealId});
    if(!meal)
        throw new NotFoundError('Not Found Error', `Meal with ID ${mealId} not found`);

    const cart = await schemas.Cart.findOne({table_id: tableId});
    if(!cart)
        throw new NotFoundError('Not Found Error', `Cart with ID ${tableId} not found`);
    else {
        const mealIndex = cart.cart_items.findIndex(item => item.meal_id === parseInt(mealId));

        if(mealIndex == -1)
            throw new NotFoundError('Not Found Error', `Meal with ID ${mealId} not found in the cart`);
        else {
            if(quantity == 0)
                cart.cart_items.splice(mealIndex, 1);
            else {
                cart.cart_items[mealIndex].quantity = parsedQuantity;

                if(comment)
                    cart.cart_items[mealIndex].comments = comment;
            }
                
        }
        await cart.save();
    }    

    // Creating a custom object to only return specific fields
    const cartSummary = {
        table_id: cart.table_id,
        cart_items: cart.cart_items.map(item => ({
            meal_id: item.meal_id,
            quantity: item.quantity,
            comment: item.comment
        }))
    };

    
    res.status(200).send({message: `Cart ${tableId} updated`, cart: cartSummary});
};


const DeleteFromCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.summary = 'Remove a product from the cart'
    // #swagger.security = []

    const mealId = req.params.mealid;
    const tableId = req.params.tableid;

    // Find the cart for the specific table
    const cart = await schemas.Cart.findOne({ table_id: tableId });

    if (!cart) 
        throw new NotFoundError('Not Found Error', `Cart for table ${tableId} not found`);

    // Find the index of the product in the cart
    const mealIndex = cart.cart_items.findIndex(item => item.meal_id === parseInt(mealId));

    if (mealIndex === -1) 
        throw new NotFoundError('Not Found Error', `Product with ID ${mealId} not found in the cart`);

    // Remove the product from the cart
    cart.cart_items.splice(mealIndex, 1);
    await cart.save();

    res.status(200).send({ message: `Product with ID ${mealId} deleted from the cart` });
};


const DisplayTotalCost = async (meals) => {
    // Calculate total cost using the meals array passed from ShowCart
    const totalCost = meals.reduce((sum, meal) => sum + (meal.price * meal.quantity), 0);

    return `${totalCost.toFixed(2)}$`;
};

module.exports = {
    ShowCart,
    AddToCart,
    UpdateCart,
    DeleteFromCart
};