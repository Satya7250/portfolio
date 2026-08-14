CREATE TABLE "resume" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"public_id" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
