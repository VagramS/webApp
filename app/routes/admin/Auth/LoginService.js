const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schemas = require('../../../utils/db/Models');
const { ConflictError, NotFoundError, UnauthorizedError } = require('../../../utils/Errors/index');
require('dotenv').config();

const Registration = async (req, res) => {
  // #swagger.tags = ['Admin / Auth']
  // #swagger.description = 'Secure registration system for admin users.'
  // #swagger.summary = 'Admin registration'
  // #swagger.security = []

  const { username, password } = req.body;

  const AdminUser = await schemas.AdminUser.findOne({ username });
  if (AdminUser)
    throw new ConflictError('Conflict Error', 'User already exists');

  const hashedPassword = await bcrypt.hash(password, 7);
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '6h' });
  const newAdminUser = new schemas.AdminUser({ username, password: hashedPassword, token });
  await newAdminUser.save();
  
return res.status(200).send({ messsage: 'User created successfully' });
};

const Login = async (req, res) => {
  // #swagger.tags = ['Admin / Auth']
  // #swagger.description = 'Secure login system for admin users.'
  // #swagger.summary = 'Admin login'
  // #swagger.security = []

  const { username, password } = req.body;
  const AdminUser = await schemas.AdminUser.findOne({ username });
  if (!AdminUser)
    throw new NotFoundError('Not Found Error', 'User not found');

  const passwordMatch = await bcrypt.compare(password, AdminUser.password);

  if (!passwordMatch)
    throw new UnauthorizedError('Unauthorized Error', 'Invalid password');

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '6h' });
  AdminUser.token = token;
  await AdminUser.save();

  res.status(200).send({ message: 'Login successful', token });
};

module.exports = { Login, Registration };
