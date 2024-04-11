import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// connection by url
const sql = neon(process.env.DATABASE_URL!)
// database
export const db = drizzle(sql)
