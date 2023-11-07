import { create } from 'zustand'

import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn'
import { databases } from '@/appwrite'

type BoardState = {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodo: (todo: Todo, columnId: TypedColumn) => void
  searchKeyword: string
  setSearchKeyword: (searchKeyword: string) => void
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
  setBoardState: (board) => set({ board }),
  updateTodo: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    )
  },
  searchKeyword: '',
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
}))

export default useBoardStore
