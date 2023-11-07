import { useEffect } from 'react'
import useBoardStore from '@/store/board-store'

const useBoard = () => {
  const [
    board,
    getBoard,
    setBoardState,
    updateTodo,
    searchKeyword,
    setSearchKeyword,
  ] = useBoardStore((state) => {
    return [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodo,
      state.searchKeyword,
      state.setSearchKeyword,
    ]
  })

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return {
    board,
    getBoard,
    setBoardState,
    updateTodo,
    searchKeyword,
    setSearchKeyword,
  }
}

export default useBoard
