const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const CreateTable = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to add a new table'
    // #swagger.summary = 'Add a new table'
    res.send('Add a new table');
};

const UpdateTable = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to update a table'
    // #swagger.summary = 'Update a table'
    res.send('Update a table');
};

const DeleteTable = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to delete a table'
    // #swagger.summary = 'Delete a table'
    res.send('Delete a table');
};

const GenerateUniqueId = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique table ID'
    // #swagger.summary = 'Generate a unique table ID'
    res.send('Generate a unique table ID');
};

const GenerateUniqueUrl = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique URL for the table page'
    // #swagger.summary = 'Generate a unique URL'
    res.send('Generate a unique URL');
};

const GenerateQRCode = async (req, res, next) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate QR codes'
    // #swagger.summary = 'Generate QR codes'
    res.send('Generate QR codes');
};

module.exports = {
    CreateTable,
    UpdateTable,
    DeleteTable,
    GenerateUniqueId,
    GenerateUniqueUrl,
    GenerateQRCode
};