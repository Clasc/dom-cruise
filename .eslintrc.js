module.exports = {
  'env': {
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:react/recommended',
  ],
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
  ],
  'rules': {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
  },
};
