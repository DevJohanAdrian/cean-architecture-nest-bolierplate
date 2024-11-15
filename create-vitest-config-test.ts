import { InlineConfig } from 'vitest/node';
import * as dotenv from 'dotenv';

// Cargar el archivo .env.test
dotenv.config({ path: '.env.test' });

export const createVitestTestConfig = (testingType: string): InlineConfig => {
  return {
    root: './',
    globals: true,
    isolate: false,
    passWithNoTests: true,
    include: [`tests/${testingType}/**/*.test.ts`],
    env: process.env, // Ahora las variables de entorno son accesibles a través de process.env
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: `coverage/${testingType}`,
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts'],
    },
  };
};
