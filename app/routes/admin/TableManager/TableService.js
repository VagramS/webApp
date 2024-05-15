const schemas = require('../../../Utils/db/Schemas');
const {BadRequestError, NotFoundError, InternalServerError} = require('../../../Utils/Errors/index.js');

const CreateTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to add a new table'
    res.send('Add a new table');
};

const UpdateTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to update a table'
    res.send('Update a table');
};

const DeleteTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to delete a table'
    res.send('Delete a table');
};

const GenerateUniqueId = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique table ID'
    res.send('Generate a unique table ID');
};

const GenerateUniqueUrl = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique URL for the table page'
    res.send('Generate a unique URL');
};

const GenerateQRCode = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate QR codes'
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