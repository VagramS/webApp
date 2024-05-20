const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const AddToCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Add a product to the cart'
    // #swagger.security = []
    res.send('Product added to cart');
};

const ShowCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    // #swagger.summary = 'Show the cart'
    // #swagger.security = []

    res.send('Cart');
};

const RemoveFromCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Remove a product from the cart'
    // #swagger.security = []
    res.send('Product removed from cart');
};

const AdjustQuantity = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to adjust quantity of items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Adjust the quantity of a product in the cart'
    // #swagger.security = []
    res.send('Product quantity updated');
};

const AddComment = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to add Instructions / Comments (Text field)'
    // #swagger.summary = 'Add a comment to the order'
    // #swagger.security = []
    res.send('Comment added');
};

const DisplayTotal = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    // #swagger.summary = 'Display the total cost'
    // #swagger.security = []
    res.send('Total cost');
};

const Tip = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.'
    // #swagger.summary = 'Add a tip to the order'
    // #swagger.security = []
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