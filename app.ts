import express from "express";
import connection from "./src/config/db.config";
import { json, urlencoded } from "body-parser";
import userRouter from "./src/routes/user.route";
import packageRouter from "./src/routes/package.route";
import cors from "cors";
const app = express();
const cookieParser = require('cookie-parser');

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const allowedOrigins ="*";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Docs',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  preflightContinue: true,
};
app.use(cookieParser());
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.body);
    res.status(500).json({ message: err.message });
  }
);
app.use("/user", userRouter);
app.use("/package",packageRouter)

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err: any) => {
    console.log("Error", err);
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${process.env.PORT || 8000}`);
});
