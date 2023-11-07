import { useEffect } from 'react'
import useBoardStore from '@/store/board-store'

const useBoard = () => {
  const [board, getBoard, setBoardState, updateTodo] = useBoardStore(
    (state) => {
      return [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodo,
      ]
    }
  )

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return { board, getBoard, setBoardState, updateTodo }
}

export default useBoard
