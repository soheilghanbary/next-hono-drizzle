"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@components/extras/icons"
import { getCurrentDate } from "@lib/functions/current-date"
import { useFilterState } from "@lib/hooks/use-filter"
import { useDeleteTodo, useDoneTodo, useTodos } from "@lib/hooks/use-todos"
import { cn } from "@lib/utils"
import { Button } from "@ui/button"
import { Skeleton } from "@ui/skeleton"

const TodoLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full rounded-md bg-muted/50 shadow-sm" />
      <Skeleton className="h-12 w-full rounded-md bg-muted/50 shadow-sm" />
      <Skeleton className="h-12 w-full rounded-md bg-muted/50 shadow-sm" />
      <Skeleton className="h-12 w-full rounded-md bg-muted/50 shadow-sm" />
    </div>
  )
}

export const TodoList = () => {
  const { filter } = useFilterState()
  const { data, isLoading } = useTodos(filter)
  if (isLoading) return <TodoLoader />
  return (
    <section className="rounded-md border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-medium">Todo List (Drizzle & Hono)</h2>
          <p className="text-xs text-muted-foreground">{data?.length} Todos</p>
        </div>
        <FilterTodo />
      </div>
      <div className="space-y-4 pt-4">
        {data?.map((todo) => <TodoItem key={todo.id} {...todo} />)}
      </div>
    </section>
  )
}

const FilterTodo = () => {
  const { filter, setFilter } = useFilterState()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>
          {filter === "all" ? "Filter" : filter}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setFilter("all")}>
          All
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter("done")}>
          Done
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter("undone")}>
          UnComplete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TodoItem = (todo: any) => {
  const { mutate: deleteMutate, isPending } = useDeleteTodo()
  const { mutate: doneMKutate } = useDoneTodo()
  return (
    <div
      key={todo.id}
      className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 shadow-sm"
    >
      <div className="grow">
        <h2
          className={cn("text-sm font-medium", {
            "text-muted-foreground line-through": todo.done,
          })}
        >
          {todo.text}
        </h2>
        <p className="text-xs text-muted-foreground">
          {getCurrentDate(todo.createdAt)}
        </p>
      </div>
      <Button
        onClick={() => doneMKutate({ id: todo.id, done: !todo.done })}
        variant={"outline"}
        size={"icon"}
      >
        <Icons.check className="size-4" />
      </Button>
      <Button
        onClick={async () => await deleteMutate(todo.id)}
        disabled={isPending}
        variant={"outline"}
        size={"icon"}
      >
        <Icons.trash className="size-4 text-rose-600" />
      </Button>
    </div>
  )
}
