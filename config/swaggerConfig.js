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
        ProfitCalculation: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The ID of the profit calculation',
            },
            user_id: {
              type: 'integer',
              description: 'The ID of the user',
            },
            animals: {
              type: 'integer',
              description: 'The number of animals',
            },
            milk: {
              type: 'number',
              format: 'double',
              description: 'Milk production',
            },
            conc_milk: {
              type: 'number',
              format: 'double',
              description: 'Concentrate fed to milked animals',
            },
            conc_nonmilk: {
              type: 'number',
              format: 'double',
              description: 'Concentrate fed to non milked animals',
            },
            conc_males: {
              type: 'number',
              format: 'double',
              description: 'Concentrate fed to males',
            },
            conc_lambs: {
              type: 'number',
              format: 'double',
              description: 'Concentrate fed to lambs/kids',
            },
            hay: {
              type: 'number',
              format: 'double',
              description: 'Hay fed to animals',
            },
            straw: {
              type: 'number',
              format: 'double',
              description: 'Straw fed to animals',
            },
            silage: {
              type: 'number',
              format: 'double',
              description: 'Silage fed to animals',
            },
            other: {
              type: 'number',
              format: 'double',
              description: 'Other feed stuff fed to animals',
            },
            milk_price: {
              type: 'number',
              format: 'double',
              description: 'Milk price',
            },
            conc_milk_price: {
              type: 'number',
              format: 'double',
              description: 'Concentrate for milked animals price',
            },
            conc_nonmilk_price: {
              type: 'number',
              format: 'double',
              description: 'Concentrate for non milked animals price',
            },
            conc_males_price: {
              type: 'number',
              format: 'double',
              description: 'Concentrate for males price',
            },
            conc_lambs_price: {
              type: 'number',
              format: 'double',
              description: 'Concentrate for lambs/kids price',
            },
            hay_price: {
              type: 'number',
              format: 'double',
              description: 'Hay price',
            },
            straw_price: {
              type: 'number',
              format: 'double',
              description: 'Straw price',
            },
            silage_price: {
              type: 'number',
              format: 'double',
              description: 'Silage price',
            },
            other_price: {
              type: 'number',
              format: 'double',
              description: 'Other feed stuff price',
            },
            milk_income: {
              type: 'number',
              format: 'double',
              description: 'Income from milk',
            },
            feed_costs: {
              type: 'number',
              format: 'double',
              description: 'Total feed costs',
            },
            profit: {
              type: 'number',
              format: 'double',
              description: 'Profit',
            },
            profit_animal: {
              type: 'number',
              format: 'double',
              description: 'Profit per animal',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description:
                'The date and time when the profit calculation was created',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description:
                'The date and time when the profit calculation was last updated',
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
