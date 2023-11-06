import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

import { getTodosGroupedByColumn } from '@/api/getTodosGroupedByColumn'

type BoardState = {
  board: Board
  getBoard: () => void
}

const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      (set) => ({
        board: {
          columns: new Map<TypedColumn, Column>(),
        },
        getBoard: async () => {
          const board = await getTodosGroupedByColumn()

          set({ board })
        },
      }),
      {
        name: 'board-storage',
      }
    )
  )
)

export default useBoardStore
