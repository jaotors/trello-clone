'use client'

import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import useBoardStore from '@/store/board-store'

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ])

  useEffect(() => {
    getBoard()
  }, [getBoard])

  return <div>test</div>

  // return (
  //   <DragDropContext>
  //     <Droppable droppableId='board' direction='horizontal' type='column'>
  //       {(provided) => <div>{/* columns */}</div>}
  //     </Droppable>
  //   </DragDropContext>
  // )
}

export default Board
