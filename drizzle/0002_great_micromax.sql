CREATE TABLE IF NOT EXISTS "category" (
	"categoryId" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subcategory" (
	"subcategoryId" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"categoryId" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_categoryId_category_categoryId_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("categoryId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
