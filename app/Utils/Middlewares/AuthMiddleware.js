const jwt = require('jsonwebtoken');
const schemas = require('../db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../Errors/index.js');
const { check, validationResult } = require('express-validator');
const {secret} = require('../../../config.js');

const verifyToken = async(req, res, next) => {
  const authorizationHeader = req.headers?.authorization;
  if (!authorizationHeader) 
    throw new UnauthorizedError('Not authenticated');

  const token = authorizationHeader.split(' ')[1];

  // check if token expired
  let tokenExpired = false;
  jwt.verify(token, secret, (err) => {
    if (err) {
      tokenExpired = true;
      throw new UnauthorizedError('Token expired');
    }
  });

  if (!tokenExpired) {
    const admin = await schemas.AdminUser.findOne({ token });
    if (!admin) 
      throw new UnauthorizedError('Not admin user');
    
    req.admin = admin;
  }
  next();
}

const verifyRegistration = [
    check('username', 'Username cannot be null').notEmpty(),
    check('password', 'Password should contain at least 4 symbols').isLength({ min: 4 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        throw new BadRequestError('Invalid input', errors.array()); 
      next();
    }
];

module.exports = {verifyToken, verifyRegistration};