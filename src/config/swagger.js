
import dotenv from 'dotenv';

dotenv.config();

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost/5000',
      },
    ],
  },
  // spécification des chemins vers les fichiers contenant les routes
  apis: ['./src/routes/*.js'],
};

