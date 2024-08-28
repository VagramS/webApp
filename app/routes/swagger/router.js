const router = require('express-promise-router')();
const swaggerUI = require('swagger-ui-express');

const options = { disableLogs: true };
const swaggerAutogen = require('swagger-autogen')(options);
const swaggerDoc = require('./swagger_output.json');

const doc = {
  info: {
    title: 'API Documentation for Food Ordering System',
    description: 'This is a REST API application made with Express. It retrieves data from a MongoDB database and returns it as JSON.',
    version: '1.0.0',
  },
  host: 'localhost:3001',
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Enter your bearer token in the format 'Bearer <token>'",
    },
  },
  security: [{
    Bearer: [],
  }],
};

const swaggerOptions = {
  swaggerOptions: {
    requestInterceptor: (req) => {
      const token = req.headers.Authorization || '';
      if (token && !token.startsWith('Bearer ')) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      
return req;
    },
  },
};

const outputFile = './app/routes/swagger/swagger_output.json';
const endpointsFiles = ['app/routes/mainRouter.js'];

// swaggerAutogen(outputFile, endpointsFiles, doc);

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc, swaggerOptions));

module.exports = { Swagger_Router: router };
