const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');

const CreateTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to add a new table'
    // #swagger.summary = 'Add a new table'
    // #swagger.security = [{ "apiKeyAuth": [] }]
    
    res.status(200).send({message: 'Table added', table});
};

const UpdateTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to update a table'
    // #swagger.summary = 'Update a table'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    res.status(200).send({message: 'Table updated', table});
};

const DeleteTable = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Allow admin to delete a table'
    // #swagger.summary = 'Delete a table'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    res.status(200).send({message: 'Table deleted', table});
};

const GenerateUniqueId = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique table ID'
    // #swagger.summary = 'Generate a unique table ID'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    res.status(200).send({message: 'Unique ID generated', ID});
};

const GenerateUniqueUrl = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate a unique URL for the table page'
    // #swagger.summary = 'Generate a unique URL'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    res.status(200).send({message: 'Unique URL generated', url});
};

const GenerateQRCode = async (req, res) => {
    // #swagger.tags = ['Admin / Table Manager']
    // #swagger.description = 'Generate QR codes'
    // #swagger.summary = 'Generate QR codes'
    // #swagger.security = [{ "apiKeyAuth": [] }]

    res.status(200).send({message: 'QR code generated', qr});
};

module.exports = {
    CreateTable,
    UpdateTable,
    DeleteTable,
    GenerateUniqueId,
    GenerateUniqueUrl,
    GenerateQRCode
};