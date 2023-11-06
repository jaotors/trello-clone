import { useEffect } from 'react'
import useBoardStore from '@/store/board-store'

const useBoard = () => {
  const [board, getBoard] = useBoardStore((state) => {
    return [state.board, state.getBoard]
  })

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return { board, getBoard }
}

export default useBoard
