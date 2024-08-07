import { TodosActions, useTodosContext } from "@/contexts"
import type { ITask } from "@/types"
import { Pen, Trash } from "@phosphor-icons/react"
import { useId } from "react"

function TodoItem({ id, name, isCompleted }: ITask) {
  const { dispatchTodos } = useTodosContext()
  const rawID = useId()
  const inputID = `task-${id}-${rawID}`

  function handleTodoToggle() {
    dispatchTodos({ type: TodosActions.ToggleTodo, id })
  }
  function handleItemDeletion() {
    dispatchTodos({ type: TodosActions.DeleteTodo, id })
  }

  return (
    <li className="flex items-center gap-2">
      <input
        onChange={handleTodoToggle}
        checked={isCompleted}
        id={inputID}
        className="checkbox checkbox-primary"
        type="checkbox"
      />
      <label
        htmlFor={inputID}
        className={`grow cursor-pointer ${isCompleted ? "text-gray-500 line-through" : ""}`}
      >
        {name}
      </label>
      <button disabled className="btn btn-sm btn-square btn-outline btn-warning" type="button">
        <Pen size={20} />
      </button>
      <button
        onClick={handleItemDeletion}
        className="btn btn-sm btn-square btn-outline btn-error"
        type="button"
      >
        <Trash size={20} />
      </button>
    </li>
  )
}

export { TodoItem }
