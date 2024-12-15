import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useCallback } from "react"

export class Task {
  constructor(
    public id: string,
    public name: string,
    public isCompleted: boolean,
  ) {}
}

const INITIAL_TODOS: Task[] = [
  new Task(crypto.randomUUID(), "Learn to use Todoly!", false),
  new Task(crypto.randomUUID(), "Use Todoly!", false),
]

const tasksAtom = atomWithStorage<Task[]>("TASKS", INITIAL_TODOS)

export function useTasksAtom() {
  const [tasks, setTasks] = useAtom(tasksAtom)

  const add = useCallback(
    (name: string) => {
      const newId = crypto.randomUUID()
      setTasks([...tasks, new Task(newId, name, false)])
    },
    [tasks, setTasks],
  )

  const remove = useCallback(
    (id: string) => {
      setTasks(tasks.filter(t => t.id !== id))
    },
    [tasks, setTasks],
  )

  const toggle = useCallback(
    (id: string) => {
      setTasks(tasks.map(t => (t.id === id ? new Task(t.id, t.name, !t.isCompleted) : t)))
    },
    [tasks, setTasks],
  )

  const rename = useCallback(
    (id: string, name: string) => {
      setTasks(tasks.map(t => (t.id === id ? new Task(t.id, name, t.isCompleted) : t)))
    },
    [tasks, setTasks],
  )

  return { tasks, setTasks, add, remove, toggle, rename }
}
