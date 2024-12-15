import { useTasksAtom } from "@/shared/atoms"
import { PaperPlaneTilt } from "@phosphor-icons/react"
import { useRef } from "react"

export function NewTaskForm() {
  const tasks = useTasksAtom()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!inputRef.current?.value) return

    const taskName = inputRef.current.value
    tasks.add(taskName)

    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input ref={inputRef} type="text" name="taskName" className="input input-bordered grow" />
      <button type="submit" className="btn btn-primary btn-square sm:w-max sm:px-4">
        <PaperPlaneTilt size={24} />
        <span className="hidden sm:inline-block">Add Task</span>
      </button>
    </form>
  )
}
