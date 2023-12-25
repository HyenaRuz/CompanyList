module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-no-undef": "error",
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prop-types": ["error", { ignore: ["children"] }],
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};
