import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    schema: "schema/users.ts",
    dialect: "postgresql",
    //driver: "pg",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    verbose: true,
    strict: true
})