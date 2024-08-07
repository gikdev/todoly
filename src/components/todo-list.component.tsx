import { TodoItem } from "@/components"
import { useTodosContext } from "@/contexts"
import type { ITask } from "@/types"

function toReversed<T>(arr: T[]): T[] {
  const clone = [...arr]
  clone.reverse()
  return clone
}

function TodoList() {
  const { todos } = useTodosContext()

  return (
    <ul className="flex flex-col gap-4">
      {!todos.length && <p className="text-center">Nothing to do! 😀</p>}
      {toReversed<ITask>(todos).map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}

export { TodoList }
