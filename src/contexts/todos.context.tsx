import type { ITask } from "@/types"
import { createContext, useContext, useEffect, useReducer } from "react"

class Task {
  constructor(
    public id: string,
    public name: string,
    public isCompleted: boolean,
  ) {}
}

enum TodosActions {
  AddTodo = "add-todo",
  DeleteTodo = "delete-todo",
  EditTodo = "edit-todo",
  ToggleTodo = "toggle-todo",
  SetTodos = "set-todos",
}

interface IProps {
  children: React.ReactNode
}

type IAction =
  | { type: TodosActions.AddTodo; name: string }
  | { type: TodosActions.DeleteTodo; id: string }
  | { type: TodosActions.EditTodo; id: string; name: string }
  | { type: TodosActions.ToggleTodo; id: string }
  | { type: TodosActions.SetTodos; todos: ITask[] }

interface IContext {
  todos: ITask[]
  dispatchTodos: React.Dispatch<IAction>
}

const INITIAL_TODOS: ITask[] = [
  // new Task(crypto.randomUUID(), "Learn to use Todoly!", false),
  // new Task(crypto.randomUUID(), "Use Todoly!", false),
]

const TodosContext = createContext<IContext>({
  todos: INITIAL_TODOS,
  dispatchTodos: () => {},
})

function reducer(todos: ITask[], action: IAction): ITask[] {
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

function TodosProvider({ children }: IProps) {
  const [todos, dispatch] = useReducer(reducer, INITIAL_TODOS)
  const value = { todos, dispatchTodos: dispatch }

  useEffect(() => {
    const savedTodos = localStorage.getItem("TODOS")
    const toSetTodos = savedTodos ? JSON.parse(savedTodos) : INITIAL_TODOS
    dispatch({ type: TodosActions.SetTodos, todos: toSetTodos })
  }, [])

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}

const useTodosContext = (): IContext => useContext(TodosContext)

export { useTodosContext, TodosProvider, TodosActions }
