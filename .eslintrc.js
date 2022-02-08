module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'space-before-function-paren': 0,
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prettier/prettier': 'off',
    // 严格的检查缩进问题
    index: 0,
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    //引入模块没有放入顶部
    'import/first': 0,
    //已定义但是没有使用，'scope' is defined but never used
    'vue/no-unused-vars': 0
  }
}
