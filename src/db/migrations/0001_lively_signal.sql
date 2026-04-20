CREATE TABLE IF NOT EXISTS "marketing_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"company_name" text,
	"country" text,
	"source" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "marketing_leads_email_uq" ON "marketing_leads" USING btree ("email");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "marketing_leads_source_idx" ON "marketing_leads" USING btree ("source");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "marketing_leads_status_idx" ON "marketing_leads" USING btree ("status");
