'use client'

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd'
import { XCircleIcon } from '@heroicons/react/20/solid'

import useBoardStore from '@/store/board-store'

type Props = {
  todo: Todo
  index: number
  id: TypedColumn
  innerRef: (element: HTMLElement | null) => void
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

function TodoCard({
  todo,
  id,
  index,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const deleteTodo = useBoardStore((state) => state.deleteTodo)

  return (
    <div
      className='bg-white rounded-md space-y-2 drop-shadow-md'
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className='flex justify-between items-center p-5'>
        <p>{todo.title}</p>
        <button
          className='text-red-500 hover:text-red-600'
          onClick={() => deleteTodo(index, todo, id)}
        >
          <XCircleIcon className='ml-5 h-8 w-8' />
        </button>
      </div>
    </div>
  )
}

export default TodoCard
