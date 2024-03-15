const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Authentication App API',
      version: '1.0.0',
      description: 'A simple Express Authentication App API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'The status of the response',
            },
            statusCode: {
              type: 'integer',
              description: 'The HTTP status code of the response',
            },
            message: {
              type: 'string',
              description: 'The error message',
            },
          },
        },
      },
    },
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Adjust the path according to your project structure
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
// The swaggerConfig.js file is used to define the Swagger documentation for the API. The swagger-jsdoc package is used to define the Swagger documentation. The options object contains the definition of the API, including the title, version, description, and servers. The apis property specifies the path to the API routes. The swaggerSpec object is created using swaggerJSDoc(options) and is then exported.
