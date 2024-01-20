module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['xo', 'plugin:react/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			extends: ['xo-typescript'],
			files: ['*.ts', '*.tsx'],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'import'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'import/order': [
			'error',
			{
				groups: [['builtin', 'external', 'internal']],
				'newlines-between': 'always',
			},
		],
	},
};
