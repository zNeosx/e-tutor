CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'STUDENT', 'INSTRUCTOR');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'STUDENT' NOT NULL,
	"avatar" text,
	"title" text,
	"is_profile_completed" boolean DEFAULT false,
	"reset_password_token" text,
	"reset_password_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_signed" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_reset_password_token_unique" UNIQUE("reset_password_token")
);
