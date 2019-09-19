module.exports = {
  extends: [
    "airbnb-typescript/base",
  ],
  rules: {
    "semi": 0,
    "eqeqeq": [1, "always"],
    "quotes": [1, "single"],
    "no-undef": 0,
    "no-console": 1,
    "no-unused-vars": 0,
    "no-mixed-operators": [1, 
      { 
        "allowSamePrecedence": true 
      }
    ],
    "eol-last": [2, "always"],
    "no-confusing-arrow": 0,
    "arrow-parens": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "arrow-body-style": [2, "as-needed"],
    "no-extra-parens": [
      "warn",
      "all",
      {
        "conditionalAssign": false,
        "nestedBinaryExpressions": false,
        "ignoreJSX": "none",
        "enforceForArrowConditionals": false
      }
    ],
    "no-param-reassign": 0,
    "prefer-template": 0,
    "prefer-promise-reject-errors": 0,
    "no-script-url": 0,
    "prefer-promise-reject-errors": 0,
    "no-unused-expressions": 0,
    "max-len": ["error", { "code": 120 }],
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
  }
};