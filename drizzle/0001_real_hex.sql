CREATE TABLE IF NOT EXISTS "orderItem" (
	"orderId" varchar NOT NULL,
	"productId" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order" RENAME COLUMN "productId" TO "storeId";--> statement-breakpoint
ALTER TABLE "store" RENAME COLUMN "id" TO "storeId";--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_productId_product_productId_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "product_id_store_id_fk";
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "is_Paid" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "address" text DEFAULT '';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_productId_product_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_order_orderId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("orderId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_storeId_store_storeId_fk" FOREIGN KEY ("storeId") REFERENCES "public"."store"("storeId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_id_store_storeId_fk" FOREIGN KEY ("id") REFERENCES "public"."store"("storeId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
