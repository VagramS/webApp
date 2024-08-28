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

// to fix link to menu page
const CreateTable = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to add a new table'
  // #swagger.summary = 'Add a new table'
  // #swagger.security = [{ "Bearer": [] }]

  const { table_id, seats, is_avaliable } = req.body;
  if (!table_id || !seats)
    throw new BadRequestError('Bad Request Error', 'Table id and seats are required');

  if(is_avaliable)
    table.is_avaliable = is_avaliable;

  if (await schemas.Table.findOne({ table_id }))
    throw new ConflictError('Conflict Error', `Table ${table_id} already exists`);

  // Generate a unique URL for the menu page with the embedded table ID
  const menuPageUrl = url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3001,
    pathname: `client/menu/categories?table_id=${table_id}`,
  });

  const qrCode = await qrcode.toDataURL(menuPageUrl);

  const table = new schemas.Table({
    table_id, seats, is_avaliable, url: menuPageUrl, qr_code_url: qrCode,
  });
  const cart = new schemas.Cart({
    table_id, cart_items: [], total_cost: 0, tip_amount: 0, comment: '', created_at: localTime,
  });
  await cart.save();

  if (!table)
    throw new InternalServerError('Internal Server Error', 'Table could not be created');
  else
    await table.save();

  res.status(200).send({ message: 'Table added', table });
};

const UpdateTable = async (req, res) => {
  // #swagger.tags = ['Admin / Table Manager']
  // #swagger.description = 'Allow admin to update a table'
  // #swagger.summary = 'Update a table'
  // #swagger.security = [{ "Bearer": [] }]

  const { tableid } = req.params;
  const table = await schemas.Table.findOne({ table_id: tableid });
  const { seats } = req.body;

  if (!seats)
    throw new BadRequestError('Bad Request Error', 'Seats are required');
  else
    table.seats = seats;

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
  CreateTable,
  UpdateTable,
  DeleteTable,
};
