import "reflect-metadata";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import { AppDataSource } from "./data-source";
import userRoutes from './routes/userRoutes';
import planRoutes from './routes/planRoutes';

export const app: Application = express();

app.use(express.json());

// Database connection
AppDataSource.initialize()
.then(() => {
  console.log("Connected to PostgreSQL database");

  // User management routes
  app.use('/api/users', userRoutes);

  // Start the server after successful database connection
  const port = process.env.PORT ?? 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch((error) => console.log("Database connection error:", error));

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "API documentation for my project",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./src/routes/*.ts"], // Specify the path to your routes files
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// User management routes
app.use('/api/users', userRoutes);
// Plan generation routes
app.use('/api/plans', planRoutes);
