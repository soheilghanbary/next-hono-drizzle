import { AddTodo } from "@components/shared/todos/add-todo"
import { TodoList } from "@components/shared/todos/todo-list"
import { ToggleTheme } from "@components/shared/toggle-theme"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "hey there, this is a Home Page",
}

export default async function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <section className="mx-auto max-w-sm space-y-4">
        <ToggleTheme />
        <AddTodo />
        <TodoList />
      </section>
    </div>
  )
}
