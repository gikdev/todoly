import "./styles.css"
import { App } from "@/components"
import React from "react"
import ReactDOM from "react-dom/client"
import { TodosProvider } from "./contexts"

const container = document.querySelector("#root") as HTMLDivElement
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </React.StrictMode>,
)
