import { create } from "zustand"

type Props = {
  filter: "all" | "done" | "undone" | string
  setFilter: (newFilter: string) => void
}

export const useFilterState = create<Props>((set) => ({
  filter: "all",
  setFilter: (newFilter: string) => set({ filter: newFilter }),
}))
