import { create } from 'zustand'

import { getTodosGroupedByColumn } from '@/api/getTodosGroupedByColumn'

type BoardState = {
  board: Board
  getBoard: () => void
}

const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done']
const defaultColumns = new Map<TypedColumn, Column>()

for (const columnType of columnTypes) {
  defaultColumns.set(columnType, {
    id: columnType,
    todos: [],
  })
}

const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: defaultColumns,
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()

    set({ board })
  },
}))

export default useBoardStore
