module.exports = {
	env: {
		browser: true,
		es2021: true,
		'jest/globals': true,
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
	plugins: ['react', 'import', 'jest'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/triple-slash-reference': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'import/order': [
			'error',
			{
				groups: [['builtin', 'external', 'internal']],
				'newlines-between': 'always',
			},
		],
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'new-cap': 'off',
	},
};
