import { createContext, useContext, useEffect, useReducer } from "react"

interface ITask {
  id: string
  name: string
  isCompleted: boolean
}

export class Task {
  constructor(
    public id: string,
    public name: string,
    public isCompleted: boolean,
  ) {}
}

export enum TodosActions {
  AddTodo = "add-todo",
  DeleteTodo = "delete-todo",
  EditTodo = "edit-todo",
  ToggleTodo = "toggle-todo",
  SetTodos = "set-todos",
}

interface Props {
  children: React.ReactNode
}

type Action =
  | { type: TodosActions.AddTodo; name: string }
  | { type: TodosActions.DeleteTodo; id: string }
  | { type: TodosActions.EditTodo; id: string; name: string }
  | { type: TodosActions.ToggleTodo; id: string }
  | { type: TodosActions.SetTodos; todos: Task[] }

interface IContext {
  todos: Task[]
  dispatchTodos: React.Dispatch<Action>
}

const INITIAL_TODOS: Task[] = [
  // new Task(crypto.randomUUID(), "Learn to use Todoly!", false),
  // new Task(crypto.randomUUID(), "Use Todoly!", false),
]

const TodosContext = createContext<IContext>({
  todos: INITIAL_TODOS,
  dispatchTodos: () => {},
})

function reducer(todos: Task[], action: Action): Task[] {
  if (action.type === TodosActions.SetTodos) {
    return action.todos
  }

  if (action.type === TodosActions.AddTodo) {
    const newID = crypto.randomUUID()
    return [...todos, new Task(newID, action.name, false)]
  }

  if (action.type === TodosActions.DeleteTodo) {
    return todos.filter(todo => todo.id !== action.id)
  }

  if (action.type === TodosActions.ToggleTodo) {
    return todos.map(todo =>
      todo.id === action.id ? new Task(todo.id, todo.name, !todo.isCompleted) : todo,
    )
  }

  if (action.type === TodosActions.EditTodo) {
    return todos.map(todo =>
      todo.id === action.id ? new Task(todo.id, action.name, todo.isCompleted) : todo,
    )
  }

  return []
}

export function TodosProvider({ children }: Props) {
  const [todos, dispatch] = useReducer(reducer, INITIAL_TODOS)
  const value = { todos, dispatchTodos: dispatch }

  useEffect(() => {
    const savedTodos = localStorage.getItem("TODOS")
    const nextTodos = savedTodos ? JSON.parse(savedTodos) : INITIAL_TODOS
    dispatch({ type: TodosActions.SetTodos, todos: nextTodos })
  }, [])

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}

export const useTodosContext = (): IContext => useContext(TodosContext)
