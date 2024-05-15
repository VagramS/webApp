const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const AddToCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product added to cart');
};

const ShowCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    res.send('Cart');
};

const RemoveFromCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product removed from cart');
};

const AdjustQuantity = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to adjust quantity of items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    res.send('Product quantity updated');
};

const AddComment = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to add Instructions / Comments (Text field)'
    res.send('Comment added');
};

const DisplayTotal = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    res.send('Total cost');
};

const Tip = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.'
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