module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "react"
  ],
  "globals": {
    "fetch": true,
    "alert": true
  },
  "rules": {
    "no-underscore-dangle": 0,
    "react/forbid-prop-types": 0,
    "class-methods-use-this": 0,
    "global-require": 0,
    "linebreak-style": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ]
  }
};
