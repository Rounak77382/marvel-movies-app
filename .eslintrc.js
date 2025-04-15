module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    serviceworker: true, // This enables ServiceWorker globals like 'self'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    // General rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
    // React specific rules
    'react/prop-types': 'off', // If you're not using PropTypes
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import rules
    'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    // Additional globals if needed
    indexedDB: true,
  },
};