require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');

// Routes
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healtRoutes');
const profitCalculationRoutes = require('./routes/profitCalculationRoutes');
// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:9000',
    'http://api.proudfarmincubator.gr',
    'https://api.proudfarmincubator.gr',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
require('./config/passport');
const passport = require('./config/passport');

app.use(passport.initialize());

// Modular routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
app.use('/profit-calculation', profitCalculationRoutes);

// Handling Undefined Routes
const NotFoundError = require('./utils/NotFoundError');

app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});
// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
