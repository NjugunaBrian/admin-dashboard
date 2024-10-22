import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { ProductTable } from "./product-table";

export const StoreTable = pgTable("store", {
    storeId: varchar("id", { length: 30 }).$defaultFn(() => generateUUID()).primaryKey(),
    userId: varchar("user_id").notNull(),
    name: varchar("name").notNull(),
    description: text("description"),
    slug: text("slug").unique(),
    active: boolean("active").notNull().default(false),
    stripeAccountId: varchar("stripeAccountId"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").default(sql`current_timestamp`),

});

export const StoreTableRelations = relations(StoreTable, ({ many }) => {
    return {
        products: many(ProductTable)
    }
});

export type Store = typeof StoreTable.$inferSelect;