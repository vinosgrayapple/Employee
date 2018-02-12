module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true
	},
	extends: [
		'plugin:vue/essential',
		'standard',
		'prettier',
		'prettier/standard',
		'plugin:prettier-rules/eslint'
	],
	plugins: ['vue', 'prettier', 'prettier-rules'],
	rules: {
		'generator-star-spacing': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
};
