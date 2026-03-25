import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

export default [
  // 1. Recommandations de base
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],

  // 2. Configuration globale
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 3. Configuration spécifique Svelte
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte'],
      },
    },
  },

  // 4. Tes règles de "Confiance" (L'idée 1)
  {
    rules: {
      // Désactivé : car tu utilises systématiquement sanitize()
      'svelte/no-at-html-tags': 'off', 
      
      // Désactivé : trop strict pour un projet simple
      'svelte/no-navigation-without-resolve': 'off',

      // On garde un avertissement pour le 'any' dans le code source
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  },

  // 5. Silence total pour les fichiers de TEST
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },

  // 6. Les fichiers à ignorer
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/'],
  }
];