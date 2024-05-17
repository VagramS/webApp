const router = require('express-promise-router')();
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger_output.json');
const options = {disableLogs: true};
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
    info: {
        title: 'API Documentation for Food Ordering System',
        description: 'This is a REST API application made with Express. It retrieves data from a MongoDB database and returns it as JSON.',
        version: '1.0.0',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './app/routes/swagger/swagger_output.json';
const endpointsFiles = ['app/routes/mainRouter.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = {Swagger_Router: router};