module.exports = {
    root: true,
    parser: 'babel-eslint',
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        allowImportExportEverywhere: true,
        codeFrame: false
    },
    "rules": {
    },
    extends: [
        'airbnb-standard',
      ],
};