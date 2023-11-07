import clsx from 'clsx'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import TodoCard from './todo-card'

import { PlusCircleIcon } from '@heroicons/react/20/solid'
import useBoard from '@/hooks/use-board'

type Props = {
  id: TypedColumn
  todos: Todo[]
  index: number
}

const labelColumn: {
  [key in TypedColumn]: string
} = {
  todo: 'Todo',
  inprogress: 'In Progress',
  done: 'Done',
}

const Column = ({ id, todos, index }: Props) => {
  const { searchKeyword } = useBoard()

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type='card'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={clsx(
                  'p-2 rounded-2xl shadow-sm',
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                )}
              >
                <h2 className='flex justify-between font-bold text-xl p-2'>
                  {labelColumn[id]}
                  <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>
                    {!searchKeyword
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchKeyword.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className='space-y-2'>
                  {todos.map((todo, index) => {
                    if (
                      searchKeyword &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    ) {
                      return null
                    }

                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            key={todo.$id}
                            todo={todo}
                            id={id}
                            index={index}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}

                  <div className='flex items-end justify-end p-2'>
                    <button className='text-green-500 hover:text-green-600'>
                      <PlusCircleIcon className='h-10 w-10' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column
