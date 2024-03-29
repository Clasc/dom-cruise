module.exports = {
  'env': {
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier"
  ],
  'parser': '@typescript-eslint/parser',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
