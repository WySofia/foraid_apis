import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['src/**/*.{ts,tsx}'] },
    {
        ignores: ['node_modules', 'dist', 'build', 'coverage', 'public', 'tests'],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^value$' },
            ],
            'no-trailing-spaces': 'error',
            'no-underscore-dangle': 'error',
            'no-console': 'error',
        },
    },
];
