module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    settings: {
        'import/extensions': [
            '.ts',
        ],
    },
    rules: {
        indent: [2, 4],
        quotes: ['error', 'single'],
        'no-console': 2,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
        '@typescript-eslint/indent': [2, 4],
        'comma-dangle': ['error', 'always-multiline'],

    },
};
