import "reflect-metadata";
   import { DataSource } from "typeorm";
   import User from "./models/userModel";

   console.log('DB_HOST:', process.env.DB_HOST);
   console.log('DB_USERNAME:', process.env.DB_USERNAME);
   console.log('DB_NAME:', process.env.DB_NAME);

   export const AppDataSource = new DataSource({
     type: "postgres",
     host: process.env.DB_HOST || "db",
     port: 5432,
     username: process.env.DB_USERNAME || "user",
     password: process.env.DB_PASSWORD || "password",
     database: process.env.DB_NAME || "mydb",
     synchronize: true,
     logging: true,
     entities: [User],
     migrations: [],
     subscribers: [],
   });