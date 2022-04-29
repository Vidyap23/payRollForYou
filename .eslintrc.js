module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: ['airbnb-base', 'prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'import/prefer-default-export': 'off',
		'no-console': 0,
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	plugins: ['prettier'],
};
