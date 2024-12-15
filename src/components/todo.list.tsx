import { TodoItem } from "@/components/todo-item"
import { Task, useTodosContext } from "@/shared/todos.cntx"

function toReversed<T>(arr: T[]): T[] {
  const clone = [...arr]
  clone.reverse()
  return clone
}

export function TodoList() {
  const { todos } = useTodosContext()

  return (
    <ul className="flex flex-col gap-4">
      {!todos.length && <p className="text-center">Nothing to do! 😀</p>}
      {toReversed<Task>(todos).map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}
