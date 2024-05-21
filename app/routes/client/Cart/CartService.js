const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');


const ShowCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the selected items in the cart.'
    // #swagger.summary = 'Show the cart'
    // #swagger.security = []


    res.status(200).send({message: 'Cart items showed', cart});
};

const DisplayTotal = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Display the total cost of the order.'
    // #swagger.summary = 'Display the total cost'
    // #swagger.security = []


    res.status(200).send({message: 'Total cost showed', Total});
};

const AddToCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Allow users to add meals to the cart from both the menu page and the product page.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Add a product to the cart'
    // #swagger.security = []


    res.status(200).send({message: 'Product added to cart', product});
};

const AddComment = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to add Instructions / Comments (Text field)'
    // #swagger.summary = 'Add a comment to the order'
    // #swagger.security = []


    res.status(200).send({message: 'Comment added', comment});
};

const Tip = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Include a tipping option at checkout, allowing users to select a predefined tip amount or enter a custom tip amount.'
    // #swagger.summary = 'Add a tip to the order'
    // #swagger.security = []


    res.status(200).send({message: 'Tip added', tip});
};

const AdjustQuantity = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to adjust quantity of items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Adjust the quantity of a product in the cart'
    // #swagger.security = []


    res.status(200).send({message: 'Product quantity', comment});
};







const DeleteFromCart = async (req, res) => {
    // #swagger.tags = ["Client / Cart"]
    // #swagger.description = 'Ability to remove items from the cart.'
    // #swagger.parameters['productId'] = { description: 'Product ID', type: 'Integer'}
    // #swagger.summary = 'Remove a product from the cart'
    // #swagger.security = []


    res.status(200).send({message: 'Product deleted from the cart', product});
};

module.exports = {
    AddToCart,
    ShowCart,
    DeleteFromCart,
    AdjustQuantity,
    AddComment,
    DisplayTotal,
    Tip
};