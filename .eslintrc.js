module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    "next/core-web-vitals"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "no-undef": "off",
		"no-tabs": "off",
		"no-use-before-define": "off",
		"react/function-component-definition": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": "off",
		"react/jsx-props-no-spreading": "off",
		"react/require-default-props": "off",
		"react/button-has-type": "off",
		"import/extensions": "off",
		"import/prefer-default-export": "off",
		"no-console": "off",
		"max-len": "off",
		"import/order": "error",
		"import/no-extraneous-dependencies": "off",
		"quote-props": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"import/no-cycle": "off"
  }
}
