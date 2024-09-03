module.exports = {
  extends: [
    // "airbnb",
    // "plugin:react/recommended",
    // "prettier",
    // "prettier/react"

    // "airbnb",
    // "airbnb/hooks",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
    // "prettier/react",
    // "prettier/babel",
    // "eslint:recommended"
  ],

  plugins: ["react"],
  env: {
    browser: true,
    es6: true
  },
  // eslintIgnore: ["**.test.jsx"],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "detect" // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
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
  },
  // extends: ["plugin:prettier/recommended"],
  // globals: {
  //    Atomics: "readonly",
  //    SharedArrayBuffer: "readonly"
  // },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },

  rules: {
    // "jsx-a11y/click-events-have-key-events": ignore,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
    // "eslint(jsx-a11y/click-events-have-key-events)": ignore
  }
};
