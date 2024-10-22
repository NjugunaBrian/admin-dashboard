import { generateUUID } from "@/lib/utils";
import { decimal, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { ProductTable } from "./product-table";
import { relations, sql } from "drizzle-orm";

export const OrderTable = pgTable("order", {
    orderId: varchar("orderId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    userId: varchar("userId").notNull(),
    productId: varchar("productId").references(() => ProductTable.productId, {
    onDelete: "cascade" }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),    
});

export const OrderTableRelations = relations(OrderTable, ({ one }) => {
    return {
        product: one(ProductTable, {
            fields: [OrderTable.productId],
            references: [ProductTable.productId]
        }),
    }
});

export const Order = typeof OrderTable.$inferSelect;