import "./shared/styles.css"
import { App } from "@/components/app"
import React from "react"
import ReactDOM from "react-dom/client"
import { TodosProvider } from "./shared/todos.cntx"

const container = document.querySelector("#root") as HTMLDivElement
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </React.StrictMode>,
)
