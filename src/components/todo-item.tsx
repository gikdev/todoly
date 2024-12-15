import { Task, useTasksAtom } from "@/shared/atoms"
import { Check, Pen, Trash } from "@phosphor-icons/react"
import { useId, useState } from "react"

const containerStyles = "flex items-center gap-2 grow shrink"
const ICON_SIZE = 32

export function TodoItem({ id, name, isCompleted }: Task) {
  const tasks = useTasksAtom()
  const [taskName, setTaskName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)
  const inputID = `task-${id}-${useId()}`

  const toggleIsEditing = () => setIsEditing(curr => !curr)
  const handleTodoToggle = () => tasks.toggle(id)
  const handleItemDeletion = () => tasks.remove(id)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Update name only if necessary
    if (taskName !== name) tasks.rename(id, taskName)

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
            className="input input-bordered grow shrink"
          />
          <button type="submit" className="btn btn-square btn-outline btn-success">
            <Check size={ICON_SIZE} />
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
        className="checkbox checkbox-primary checkbox-lg"
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
        className="btn btn-square btn-outline btn-warning"
        type="button"
      >
        <Pen size={ICON_SIZE} />
      </button>
      <button
        onClick={handleItemDeletion}
        className="btn btn-square btn-outline btn-error"
        type="button"
      >
        <Trash size={ICON_SIZE} />
      </button>
    </li>
  )
}
