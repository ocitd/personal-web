CREATE TABLE "data" (
	"id" text PRIMARY KEY NOT NULL,
	"img" text NOT NULL,
	"title" text NOT NULL,
	"category" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
