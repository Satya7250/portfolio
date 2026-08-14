CREATE TABLE "about" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eyebrow" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_src" text NOT NULL,
	"image_alt" text NOT NULL,
	"intro" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"bio" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
