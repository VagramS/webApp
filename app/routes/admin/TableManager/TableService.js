const url = require('url');
const qrcode = require('qrcode');
// const { table } = require('console');
const schemas = require('../../../Utils/db/Models');
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} = require('../../../Utils/Errors/index');

const now = new Date();
const offset = now.getTimezoneOffset(); // Offset in minutes
const localTime = new Date(now.getTime() - offset * 60000); // Adjust to local time

const GetAllTables = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to get all tables'
  // #swagger.summary = 'Get all tables'
  // #swagger.security = [{ "Bearer": [] }]

  const table = await schemas.Table.find();
  if (!table)
    throw new NotFoundError('Not Found Error', 'No tables found');
  
  const tables = table.map((table) => { return { is_available: table.is_available, table_id: table.table_id, seats: table.seats, qr_code_url: table.qr_code_url } });

  res.status(200).send({ tables });
}

const CreateTable = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to add a new table'
  // #swagger.summary = 'Add a new table'
  // #swagger.security = [{ "Bearer": [] }]

  const { table_id, seats, is_available } = req.body;

  // Check if table_id and seats are provided
  if (!table_id || !seats) {
    throw new BadRequestError('Bad Request Error', 'Table id and seats are required');
  }

  // Check if the table with the given ID already exists
  if (await schemas.Table.findOne({ table_id })) {
    throw new ConflictError('Conflict Error', `Table ${table_id} already exists`);
  }

  // Check if a cart with the given table_id already exists
  if (await schemas.Cart.findOne({ table_id })) {
    throw new ConflictError('Conflict Error', `Cart for table ${table_id} already exists`);
  }

  // Generate a unique URL for the menu page with the embedded table ID
  const menuPageUrl = url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3001,
    pathname: `client/menu/categories/${table_id}`, // Include table_id to make it unique
  });

  // Generate a QR code for the unique menu URL
  const qrCode = await qrcode.toDataURL(menuPageUrl);

  // Initialize the table object with the values provided
  const table = new schemas.Table({
    table_id,
    seats,
    is_available: is_available !== undefined ? is_available === 'true' : true, // Default to true if not provided and parse the string "true"
    url: menuPageUrl, // Unique URL
    qr_code_url: qrCode,
  });

  // Initialize the cart for this table
  const cart = new schemas.Cart({
    table_id,
    cart_items: [],
    total_cost: 0,
    tip_amount: 0,
    comment: '',
    created_at: new Date(),
  });

  // Save both table and cart
  await table.save();
  await cart.save();

  res.status(200).send({ message: 'Table added', table });
};

const UpdateTable = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to update a table'
  // #swagger.summary = 'Update a table'
  // #swagger.security = [{ "Bearer": [] }]

  const { tableid } = req.params;
  const table = await schemas.Table.findOne({ table_id: tableid });
  const { seats, is_available } = req.body;

  if (!seats)
    throw new BadRequestError('Bad Request Error', 'Seats are required');
  else
    table.seats = seats;

  if (is_available)
    table.is_available = is_available;

  if (!tableid)
    throw new BadRequestError('Bad Request Error', 'Table id is required');
  if (!table)
    throw new NotFoundError('Not Found Error', `Table ${tableid} not found`);

  await table.save();

  res.status(200).send({ message: 'Table updated', table });
};

const DeleteTable = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to delete a table'
  // #swagger.summary = 'Delete a table'
  // #swagger.security = [{ "Bearer": [] }]

  const { tableid } = req.params;
  const table = await schemas.Table.findOne({ table_id: tableid });
  if (!table)
    throw new NotFoundError('Bad Request Error', `Table ${tableid} not found`);
  else
    await table.deleteOne({ table_id: tableid });

  res.status(200).send({ message: 'Table deleted', table });
};

module.exports = {
  GetAllTables,
  CreateTable,
  UpdateTable,
  DeleteTable
};
