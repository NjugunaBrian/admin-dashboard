import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "../schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})