import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const TodoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
})
