import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'tests/**/*.test.ts',
            'tests/**/*.test.tsx',
            'tests/**/*.spec.ts',
            'tests/**/*.spec.tsx',
        ],
        coverage: {
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                '**/*.config.js',
                'vite.config.mts',
                'eslint.config.mjs',
                'src/lib/**/*.ts',
                'src/main.tsx',
                'src/index.tsx',
                'src/App.tsx',
            ],
        },
    },
});
