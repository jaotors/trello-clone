import { useEffect } from 'react'
import useBoardStore from '@/store/board-store'

const useBoard = () => {
  const [board, getBoard, setBoardState] = useBoardStore((state) => {
    return [state.board, state.getBoard, state.setBoardState]
  })

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return { board, getBoard, setBoardState }
}

export default useBoard
