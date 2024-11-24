import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser, // Usamos el parser importado de @typescript-eslint/parser
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn', // Marca variables no usadas como advertencia
      'no-undef': 'error', // Marca como error las variables no definidas
      ...pluginJs.configs.recommended.rules, // Incluir las reglas recomendadas de pluginJs
      ...tsEslint.configs.recommended.rules // Incluir las reglas recomendadas de tsEslint
    }
  },
  {
    plugins: {
      '@typescript-eslint': tsEslint
    }
    // Aquí puedes añadir otras reglas personalizadas para TypeScript
  }
];
