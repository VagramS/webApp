const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schemas = require('../../../Utils/db/Models.js');
const {BadRequestError, ConflictError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError} = require('../../../Utils/Errors/index.js');
const {secret} = require('../../../../config.js');

const Registration = async (req, res) => {
    // #swagger.tags = ['Admin / Auth']
    // #swagger.description = 'Secure registration system for admin users.'
    // #swagger.summary = 'Admin registration'

    const {username, password} = req.body;
    
    const AdminUser = await schemas.AdminUser.findOne({username});
    if(AdminUser)
        throw new ConflictError('User already exists');

    const hashedPassword = await bcrypt.hash(password, 7);
    const token = jwt.sign({username: username}, secret, process.env.JWT_SECRET, {expiresIn: '6h'});
    const newAdminUser = new schemas.AdminUser({username, password: hashedPassword, token});
    await newAdminUser.save();
    return res.status(200).send({messsage: 'User created successfully'});
}

const Login = async (req, res) => {
    // #swagger.tags = ['Admin / Auth']
    // #swagger.description = 'Secure login system for admin users.'
    // #swagger.summary = 'Admin login'
    
    const {username, password} = req.body;
    const AdminUser = await schemas.AdminUser.findOne({username});
    if(!AdminUser)
        throw new NotFoundError('User not found');

    const passwordMatch = await bcrypt.compare(password, AdminUser.password);

    if(!passwordMatch)
        throw new UnauthorizedError('Invalid password');

    const token = jwt.sign({username: username}, secret, process.env.JWT_SECRET, {expiresIn: '6h'});
    AdminUser.token = token;
    await AdminUser.save();

    res.status(200).send({message: "Login successful", token});
};

module.exports = {Login, Registration};