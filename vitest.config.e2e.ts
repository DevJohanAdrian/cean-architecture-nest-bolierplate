import { defineConfig } from 'vitest/config';

import { createVitestTestConfig } from './create-vitest-config-test';

export default defineConfig({
  test: createVitestTestConfig('e2e'),
});
