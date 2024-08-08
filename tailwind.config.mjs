import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["JetBrainsMono", "monospace"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dim"],
  },
}
