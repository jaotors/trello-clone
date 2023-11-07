'use client'

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'

import useBoard from '@/hooks/use-board'

import Column from './column'

const Board = () => {
  const { board, setBoardState } = useBoard()

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return

    if (type === 'column') {
      const entries = Array.from(board.columns.entries())
      const [removed] = entries.splice(source.index, 1)

      entries.splice(destination.index, 0, removed)
      const rearrangedColumns = new Map(entries)

      setBoardState({ ...board, columns: rearrangedColumns })
    }

    const columns = Array.from(board.columns)
    const startColIndex = columns[Number(source.droppableId)]
    const endColIndex = columns[Number(destination.droppableId)]

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    }

    const endCol: Column = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    }

    if (!startCol || !endCol) return
    if (source.index === destination.index && startCol === endCol) return

    const newTodos = startCol.todos
    const [moved] = newTodos.splice(source.index, 1)

    if (startCol.id === endCol.id) {
      newTodos.splice(destination.index, 0, moved)
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      }
      const newColumns = new Map(board.columns)
      newColumns.set(startCol.id, newCol)
      setBoardState({ ...board, columns: newColumns })
    } else {
      const finishTodos = Array.from(endCol.todos)
      finishTodos.splice(destination.index, 0, moved)

      const newColumns = new Map(board.columns)
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      }

      newColumns.set(startCol.id, newCol)
      newColumns.set(endCol.id, {
        id: endCol.id,
        todos: finishTodos,
      })

      setBoardState({ ...board, columns: newColumns })
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided, snapshot) => (
          <div
            className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board
