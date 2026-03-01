import "dotenv/config"

import { promises as fs } from "fs"
import { FileMigrationProvider, Migrator } from "kysely"
import { join } from "path"

import { db } from "@/db"

async function migrate() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path: { join },
      migrationFolder: join(process.cwd(), "src/db/migrations")
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((r) => {
    if (r.status === "Success") console.log(`✅ Migration "${r.migrationName}" succeeded`)
    else if (r.status === "Error") console.error(`❌ Migration "${r.migrationName}" failed`)
  })

  if (error) {
    console.error("Migration error:", error)
    process.exit(1)
  }

  await db.destroy()
}

migrate()
