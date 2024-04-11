import { useFilterState } from "@lib/hooks/use-filter"
import { useClearTodo, useTodos } from "@lib/hooks/use-todos"
import { Button } from "@ui/button"
import { Skeleton } from "@ui/skeleton"

export const ClearTodo = () => {
  const { filter } = useFilterState()
  const { data, isLoading } = useTodos(filter)
  const { mutateAsync: clearMutate, isPending } = useClearTodo()
  const onClear = async () => {
    await clearMutate()
  }
  if (isLoading) return <Skeleton className="h-9 w-16 rounded-md bg-muted/50" />
  if (!data?.length) return null
  return (
    <Button
      type="button"
      onClick={onClear}
      variant={"ghost"}
      disabled={isPending}
    >
      Clear
    </Button>
  )
}
