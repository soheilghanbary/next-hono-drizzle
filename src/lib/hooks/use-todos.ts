import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useFilterState } from "./use-filter"

type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: Date
}

// get all todos
const useTodos = (filter: string) => {
  return useQuery({
    queryKey: ["todos", filter],
    queryFn: async () => {
      const res = await fetch("/api/todos?filter=" + filter)
      const todos = await res.json()
      return todos as Todo[]
    },
  })
}

// create new Todo
const useAddTodo = () => {
  const queryClient = useQueryClient()
  const { filter } = useFilterState()
  return useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (text: string) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return res.json()
    },
    onSuccess(res) {
      queryClient.setQueryData(["todos", filter], (oldTodos: any[]) => {
        return [res, ...oldTodos]
      })
      toast.success("Todo added successfully")
    },
  })
}

// delete todo by id
const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  const { filter } = useFilterState()
  return useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })
      return res.json()
    },
    onMutate(id: string) {
      queryClient.setQueryData(["todos", filter], (oldTodos: any[]) => {
        return oldTodos.filter((todo: any) => todo.id !== id)
      })
    },
    onSuccess(res) {
      toast(res.msg)
    },
  })
}

// clear all todos
const useClearTodo = () => {
  const queryClient = useQueryClient()
  const { filter } = useFilterState()
  return useMutation({
    mutationKey: ["clearTodo"],
    mutationFn: async () => {
      const res = await fetch("/api/todos", {
        method: "DELETE",
      })
      return res.json()
    },
    onMutate() {
      queryClient.setQueryData(["todos", filter], [])
    },
    onSuccess(res) {
      toast(res.msg)
    },
  })
}

// done todo
const useDoneTodo = () => {
  const queryClient = useQueryClient()
  const { filter } = useFilterState()
  return useMutation({
    mutationKey: ["doneTodo"],
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ done }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return res.json()
    },
    onMutate({ id, done }) {
      queryClient.setQueryData(["todos", filter], (oldTodos: any[]) => {
        return oldTodos.map((todo: any) => {
          if (todo.id === id) {
            return { ...todo, done }
          }
          return todo
        })
      })
    },
    onSuccess(res) {
      toast(res.msg)
    },
  })
}

export { useAddTodo, useClearTodo, useDeleteTodo, useDoneTodo, useTodos }
