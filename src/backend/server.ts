import { desc, eq } from "drizzle-orm"
import { Hono } from "hono"
import { db } from "./db"
import { TodoTable } from "./db/schema"

// init app
export const app = new Hono().basePath("/api")

// get all todos
app.get("/todos", async ({ req, json }) => {
  const { filter } = req.query()
  switch (filter) {
    case "all":
      return json(
        await db.select().from(TodoTable).orderBy(desc(TodoTable.createdAt))
      )
    case "done":
      return json(
        await db.select().from(TodoTable).where(eq(TodoTable.done, true))
      )
    case "undone":
      return json(
        await db.select().from(TodoTable).where(eq(TodoTable.done, false))
      )
  }
})
// create new todo
app.post("/todos", async ({ req, json }) => {
  const { text } = await req.json()
  const newTodo = await db
    .insert(TodoTable)
    .values({ text })
    .returning({ id: TodoTable.id, text: TodoTable.text, done: TodoTable.done })
  return json(newTodo[0])
})
// delete todo by id
app.delete("/todos/:id", async ({ req, json }) => {
  const id = await req.param("id")
  const deleted = await db
    .delete(TodoTable)
    .where(eq(TodoTable.id, parseInt(id)))
  return json({ msg: "todo has been deleted" })
})
// clear all todos
app.delete("/todos", async ({ json }) => {
  const deleted = await db.delete(TodoTable)
  return json({ msg: "todos has been cleared" })
})
// done todo
app.patch("/todos/:id", async ({ req, json }) => {
  const id = await req.param("id")
  const { done } = await req.json()
  const updated = await db
    .update(TodoTable)
    .set({ done })
    .where(eq(TodoTable.id, parseInt(id)))
    .returning({ id: TodoTable.id, text: TodoTable.text, done: TodoTable.done })
  return json({ msg: "todo was updated" })
})
