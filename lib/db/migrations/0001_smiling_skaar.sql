CREATE TABLE "instructors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"biography" text,
	"phone_number" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "instructors_id_unique" UNIQUE("id"),
	CONSTRAINT "instructors_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;