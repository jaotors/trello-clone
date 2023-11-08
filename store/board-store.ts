import { create } from 'zustand'

import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn'
import { databases, storage } from '@/appwrite'

type BoardState = {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updateTodo: (todo: Todo, columnId: TypedColumn) => void
  searchKeyword: string
  setSearchKeyword: (searchKeyword: string) => void
  deleteTodo: (taskIndex: number, todo: Todo, id: TypedColumn) => void
}

const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
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
  deleteTodo: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns)

    newColumns.get(id)?.todos.splice(taskIndex, 1)

    set({ board: { columns: newColumns } })

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
}))

export default useBoardStore
