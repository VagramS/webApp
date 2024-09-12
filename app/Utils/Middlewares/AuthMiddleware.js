const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const schemas = require('../db/Models');
const { BadRequestError, UnauthorizedError } = require('../Errors/index');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.headers?.authorization;
  if (!authorizationHeader)
    throw new UnauthorizedError('Unauthorized Error', 'Not authenticated');

  const token = authorizationHeader.split(' ')[1];

  // check if token expired
  let tokenExpired = false;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      tokenExpired = true;
      throw new UnauthorizedError('Unauthorized Error', 'Token expired');
    }
  });

  if (!tokenExpired) {
    const admin = await schemas.AdminUser.findOne({ token });
    if (!admin)
      throw new UnauthorizedError('Unauthorized Error', 'Not an admin user');
    req.admin = admin;
  }
  next();
};

const verifyRegistration = [
  check('username', 'Username cannot be null').notEmpty(),
  check('password', 'Password should contain at least 4 symbols').isLength({ min: 4 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new BadRequestError('Bad Request Error', errors.array());
    next();
  },
];

module.exports = { verifyToken, verifyRegistration };
