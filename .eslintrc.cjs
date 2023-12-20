module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "plugin:svelte/recommended"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'] // This is a required setting in `@typescript-eslint/parser` v4.24.0.
    },
    env: {
        browser: true, // Sets the environment to include browser globals
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        }
        // ...
    ],
    root: true,
    rules: {
        // Note: you must disable the base rule as it can report incorrect errors
        "semi": "off",
        "@typescript-eslint/semi": "error",
        "eqeqeq": "error",
        "svelte/no-at-html-tags": "off",
},
  };