import { NewTaskForm } from "./new-task.form"
import { TodoList } from "./todo.list"

export function App() {
  return (
    <>
      <Header />
      <hr className="border-none bg-primary rounded h-1 w-20 mx-auto" />
      <main className="flex flex-col gap-4">
        <section>
          <NewTaskForm />
        </section>
        <section>
          <TodoList />
        </section>
      </main>
    </>
  )
}

function Header() {
  return (
    <header className="flex items-center justify-center">
      <h1 className="text-4xl font-black">Todoly</h1>
    </header>
  )
}
