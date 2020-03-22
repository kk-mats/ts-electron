module.exports = {
	extends: [
		"airbnb",
		"prettier/@typescript-eslint",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/typescript",
		"prettier/react",
		"prettier"
	],
	plugins: [
		"@typescript-eslint",
		"react",
		"prettier",
		"jsx-a11y",
		"import"
	],
	rules: {
		"react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
		"prettier/prettier": [
			"error",
			{
				tabWidth: 4,
				useTabs: true,
				trailingComma: "none",
				endOfLine: "lf"
			}
		],
		"react/jsx-props-no-spreading": "off"
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		},
		project: "tsconfig.json"
	},
	globals: {
		document: true,
		window: true
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			typescript: {
				directory: "./tsconfig.json"
			}
		},
		propWrapperFunctions: [
			// The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
			"forbidExtraProps",
			{ property: "freeze", object: "Object" },
			{ property: "myFavoriteWrapper" }
		],
		linkComponents: [
			// Components used as alternatives to <a> for linking, eg. <Link to={ url } />
			"Hyperlink",
			{ name: "Link", linkAttribute: "to" }
		]

	}
}