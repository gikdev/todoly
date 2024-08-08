import { TodosActions, useTodosContext } from "@/contexts"
import type { ITask } from "@/types"
import { Check, Pen, Trash } from "@phosphor-icons/react"
import { useId, useState } from "react"

const containerStyles = "flex items-center gap-2 grow shrink"

function TodoItem({ id, name, isCompleted }: ITask) {
  const { dispatchTodos } = useTodosContext()
  const [taskName, setTaskName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)
  const inputID = `task-${id}-${useId()}`

  const toggleIsEditing = () => setIsEditing(curr => !curr)
  const handleTodoToggle = () => dispatchTodos({ type: TodosActions.ToggleTodo, id })
  const handleItemDeletion = () => dispatchTodos({ type: TodosActions.DeleteTodo, id })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (taskName !== name) {
      // Update name only if necessary
      dispatchTodos({ type: TodosActions.EditTodo, id, name: taskName })
    }

    // Toggle editing mode...
    toggleIsEditing()
  }

  if (isEditing)
    return (
      <li className={containerStyles}>
        <form className={containerStyles} onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            className="input input-sm input-bordered grow shrink"
          />
          <button type="submit" className="btn btn-sm btn-square btn-outline btn-success">
            <Check size={20} />
          </button>
        </form>
      </li>
    )

  return (
    <li className={containerStyles}>
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
      <button
        onClick={toggleIsEditing}
        className="btn btn-sm btn-square btn-outline btn-warning"
        type="button"
      >
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
