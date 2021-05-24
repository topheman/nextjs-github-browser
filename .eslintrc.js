module.exports = {
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".out/*",
    "public/explore/storybook/*",
    "src/generated/*",
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  // other configuration are omitted for brevity
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    // No need to import React when using Next.js
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/extensions": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react/jsx-props-no-spreading": "off", // ["error", { custom: "ignore" }],
    "react/no-unescaped-entities": "off",
    "import/no-cycle": [0, { ignoreExternal: true }],
    // "prefer-const": "off",
    // needed because of https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use & https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: true },
    ],
    // needed because of https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/prefer-default-export": "off",
    // weird - thinks "react" is "@types/react"
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["*/generated/graphql"],
      },
    ],
  },
};
