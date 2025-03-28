import { generateUUID } from "@/lib/utils";
import { relations, sql } from "drizzle-orm";
import { decimal, integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { DownloadVerificationTable } from "./verification-table";
import { StoreTable } from "./store-table";

export const ProductTable = pgTable("product", {
    productId: varchar("productId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    price: decimal("price", {precision: 10, scale: 2 }).notNull().default("0"),
    images: json("images").$type<string[] | null>().default(null),
    storeId: varchar("id").references(() => StoreTable.storeId).notNull(),
    inventory: integer("inventory").notNull().default(0),
    category: varchar("category"),
    subcategory: varchar("subcategory"),
    rating: integer("rating").notNull().default(0),
    tags: json("tags").$type<string[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),

});

export const ProductTableRelations = relations(ProductTable, ({ one, many }) => {
    return {
        store: one(StoreTable, {
            fields: [ProductTable.storeId],
            references: [StoreTable.storeId]
        }),
        DownloadVerifications: many(DownloadVerificationTable),
    }
});

export type Product = typeof ProductTable.$inferSelect;