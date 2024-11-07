import { generateUUID } from "@/lib/utils";
import { boolean, decimal, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { CartProduct } from "@/components/cart/cart-provider";
import { ProductTable } from "./product-table";

export const OrderTable = pgTable("order", {
    orderId: varchar("orderId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    isPaid: boolean("is_Paid").default(false),
    products: json("products").$type<CartProduct[] | null>().default(null),
    address: text("address").default(""),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),    
});

export const OrderTableRelations = relations(OrderTable, ({ many }) => {
    return {
        products: many(ProductTable),
    }
});


export const Order = typeof OrderTable.$inferSelect;