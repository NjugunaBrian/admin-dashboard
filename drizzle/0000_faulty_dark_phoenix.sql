CREATE TABLE IF NOT EXISTS "user" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"avatar" varchar DEFAULT '',
	"createdAt" timestamp DEFAULT now() NOT NULL
);
