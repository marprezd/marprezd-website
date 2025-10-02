import antfu from "@antfu/eslint-config"

export default antfu({
  formatters: true,
  nextjs: true,
  stylistic: {
    indent: 2,
    quotes: "double",
  },
  typescript: true,
  jsonc: true,
  yaml: true,
})
