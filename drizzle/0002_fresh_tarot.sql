DROP TABLE "orderItem";--> statement-breakpoint
ALTER TABLE "order" RENAME COLUMN "userId" TO "products";--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_storeId_store_storeId_fk";
--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "products" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "products" SET DEFAULT 'null'::json;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "products" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN IF EXISTS "storeId";