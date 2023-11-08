type Image = {
  bucketId: string
  fileId: string
}

type Todo = {
  $id: string
  $createdAt: string
  title: string
  status: TypedColumn
  image?: Image
}

type TypedColumn = 'todo' | 'inprogress' | 'done'

type Column = {
  id: TypedColumn
  todos: Todo[]
}

type Board = {
  columns: Map<TypedColumn, Column>
}
