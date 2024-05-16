const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const AddToCart = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Add a product to the cart'
    try {
        // Find the product
        const { productId, userId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }

        // Find the cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({ userId, products: [] });
        }

        // Add the product to the cart
        const productInCart = cart.products.find(p => p.productId.toString() === productId.toString());
        if (productInCart) {
            // If the product is already in the cart, increase the quantity
            productInCart.quantity += 1;
        } else {
            // If the product is not in the cart, add it
            cart.products.push({ productId, quantity: 1 });
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        next(new UnauthorizedError("Some error", [12]));
    }
};

const ShowCart = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    // #swagger.summary = 'Show the cart'
    res.send('Cart');
};

const RemoveFromCart = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Remove a product from the cart'
    res.send('Product removed from cart');
};

const AdjustQuantity = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to adjust quantity of items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Adjust the quantity of a product in the cart'
    res.send('Product quantity updated');
};

const AddComment = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to add Instructions / Comments (Text field)'
    // #swagger.summary = 'Add a comment to the order'
    res.send('Comment added');
};

const DisplayTotal = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    // #swagger.summary = 'Display the total cost'
    res.send('Total cost');
};

const Tip = async (req, res, next) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.'
    // #swagger.parameters['tipAmount'] = { description: 'Tip amount', type: 'Integer'}
    // #swagger.summary = 'Add a tip to the order'
    res.send('Tip added');
};

module.exports = {
    AddToCart,
    ShowCart,
    RemoveFromCart,
    AdjustQuantity,
    AddComment,
    DisplayTotal,
    Tip
};