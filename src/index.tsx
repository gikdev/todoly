import "./shared/styles.css"
import { App } from "@/components/app"
import React from "react"
import ReactDOM from "react-dom/client"

const container = document.querySelector("#root") as HTMLDivElement
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
