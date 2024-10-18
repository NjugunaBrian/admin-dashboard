CREATE TABLE IF NOT EXISTS "order" (
	"orderId" varchar PRIMARY KEY NOT NULL,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"userId" varchar NOT NULL,
	"productId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"productId" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"images" json DEFAULT 'null'::json,
	"inventory" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"tags" json DEFAULT 'null'::json,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "downloadVerification" (
	"downloadId" varchar PRIMARY KEY NOT NULL,
	"productId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_userId_user_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_productId_product_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("productId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "downloadVerification" ADD CONSTRAINT "downloadVerification_productId_product_productId_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("productId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
