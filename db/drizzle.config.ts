import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    schema: ["db/schema/users.ts", "db/schema/order-table.ts", "db/schema/product-table", "db/schema/verification-table"],
    dialect: "postgresql",
    //driver: "pg",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    verbose: true,
    strict: true
})