module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["vite-env.d.ts"],
  rules: {
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "import/extensions": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
    "jsx-a11y/label-has-associated-control": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/prop-types": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          props: {
            properties: false,
          },
          env: {
            environment: false,
          },
          src: {
            source: false,
          },
          ref: {
            reference: false,
          },
          params: {
            parameters: false,
          },
        },
      },
    ],
  },
  overrides: [
    {
      files: ["**/containers/*.tsx"],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": "error",
        "func-names": "off",
      },
    },
    {
      files: ["**/*.tsx"],
      rules: {
        "unicorn/no-null": "off",
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.config.ts", "*.cjs"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "import/no-default-export": "off",
        "global-require": "off",
      },
    },
  ],
};
