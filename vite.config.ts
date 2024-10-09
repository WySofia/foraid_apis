import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'src/**/*.test.ts',
            'src/**/*.test.tsx',
            'src/**/*.spec.ts',
            'src/**/*.spec.tsx',
        ],
        coverage: {
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                'src/components/ui/button.tsx',
                '**/*.config.js',
                'vite.config.ts',
                'src/lib/**/*.ts',
                'src/main.tsx',
                'src/index.tsx',
                'src/App.tsx',
            ],
        },
    },
});
