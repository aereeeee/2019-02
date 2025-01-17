module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"airbnb"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
				"jsx": true
			},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react", "react-hooks"
	],
	"rules": {
		"no-console": "off",
		"react/jsx-filename-extension": "off",
		"import/no-unresolved": "off",
		"jsx-a11y/label-has-associated-control": "off",
		"react/require-default-props": "off",
		"react/forbid-prop-types": "off",
		"no-param-reassign": "off",
		"no-nested-ternary": "off",
		"consistent-return": "off",
	}
};