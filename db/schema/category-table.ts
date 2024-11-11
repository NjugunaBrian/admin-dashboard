import { generateUUID } from "@/lib/utils";
import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const CategoryTable = pgTable("category", {
    categoryId: varchar("categoryId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    title: varchar("title").notNull(),

});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
    return {
        subcategories: many(SubCategoryTable)
    }
})

export const SubCategoryTable = pgTable("subcategory", {
    subcategoryId: varchar("subcategoryId").$defaultFn(() => generateUUID()).primaryKey().notNull(),
    title: varchar("title").notNull(),
    description: text("description").notNull(),
    categoryId: varchar("categoryId").references(() => CategoryTable.categoryId)
});

export const SubCategoryTableRelations = relations(SubCategoryTable, ({ one }) => {
    return {
        category: one(CategoryTable, {
            fields: [SubCategoryTable.categoryId],
            references: [CategoryTable.categoryId]
        })
    }
});

export type Category = typeof CategoryTable.$inferSelect;
export type SubCategory = typeof SubCategoryTable.$inferSelect;