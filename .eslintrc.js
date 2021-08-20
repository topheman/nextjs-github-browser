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
    jest: true,
  },
  extends: [
    "next",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:jest-dom/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "tailwindcss", "jest-dom"],
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
        patterns: [
          {
            group: [
              "../generated/graphql",
              "../../generated/graphql",
              "../../../generated/graphql",
              "../../../../generated/graphql",
              "../../../../../generated/graphql",
            ],
            message:
              "Don't import generated modules directly, import from src/libs/graphql",
          },
        ],
      },
    ],
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "warn",
    "tailwindcss/no-contradicting-classname": "error",
    // https://github.com/testing-library/eslint-plugin-jest-dom#usage
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",
    "jsx-a11y/click-events-have-key-events": "off",
  },
};
