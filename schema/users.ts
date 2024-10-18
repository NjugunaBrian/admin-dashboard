import { generateUUID } from "@/lib/utils";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    userId: varchar("userId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    avatar: varchar("avatar").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull(), 
})