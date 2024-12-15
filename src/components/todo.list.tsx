import { TodoItem } from "@/components/todo-item"
import { Task, useTasksAtom } from "@/shared/atoms"

function toReversed<T>(arr: T[]): T[] {
  const clone = [...arr]
  clone.reverse()
  return clone
}

export function TodoList() {
  const tasks = useTasksAtom()

  return (
    <ul className="flex flex-col gap-4">
      {!tasks.tasks.length && <p className="text-center">Nothing to do! 😀</p>}
      {toReversed<Task>(tasks.tasks).map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}
