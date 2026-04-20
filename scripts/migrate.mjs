import crypto from "node:crypto";
import path from "node:path";
import { readdir, readFile } from "node:fs/promises";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL_missing");
}

const sql = postgres(databaseUrl, { prepare: false });
const migrationDir = path.resolve(process.cwd(), "src/db/migrations");

async function ensureTrackingTable() {
  await sql.unsafe(`
    create table if not exists _witly_migrations (
      filename text primary key,
      checksum text not null,
      applied_at timestamptz not null default now()
    );
  `);
}

async function alreadyApplied(filename, checksum) {
  const rows = await sql`
    select 1
    from _witly_migrations
    where filename = ${filename} and checksum = ${checksum}
    limit 1
  `;

  return rows.length > 0;
}

async function applyMigration(fileName) {
  const filePath = path.join(migrationDir, fileName);
  const sqlText = await readFile(filePath, "utf8");
  const checksum = crypto.createHash("sha256").update(sqlText).digest("hex");

  if (await alreadyApplied(fileName, checksum)) return;

  await sql.begin(async (tx) => {
    await tx.unsafe(sqlText);
    await tx`
      insert into _witly_migrations (filename, checksum)
      values (${fileName}, ${checksum})
      on conflict (filename)
      do update set checksum = excluded.checksum, applied_at = now()
    `;
  });
}

async function main() {
  await ensureTrackingTable();

  const files = (await readdir(migrationDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    await applyMigration(file);
  }

  await sql.end({ timeout: 5 });
}

main().catch(async (error) => {
  try {
    await sql.end({ timeout: 5 });
  } catch {}
  console.error(error);
  process.exit(1);
});
