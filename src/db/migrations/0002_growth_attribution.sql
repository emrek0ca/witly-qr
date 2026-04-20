ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "referrer_code" text;
--> statement-breakpoint
ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "utm_source" text;
--> statement-breakpoint
ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "utm_medium" text;
--> statement-breakpoint
ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "utm_campaign" text;
--> statement-breakpoint
ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "landing_path" text;
--> statement-breakpoint
ALTER TABLE "marketing_leads" ADD COLUMN IF NOT EXISTS "lead_score" integer NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "marketing_leads_referrer_idx" ON "marketing_leads" USING btree ("referrer_code");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "marketing_leads_utm_source_idx" ON "marketing_leads" USING btree ("utm_source");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "marketing_leads_utm_campaign_idx" ON "marketing_leads" USING btree ("utm_campaign");
