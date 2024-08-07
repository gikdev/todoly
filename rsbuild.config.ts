import path from "node:path"
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: "./src/index.html",
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
