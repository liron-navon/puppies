// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   "testPathIgnorePatterns": [
//     "node_modules/(?!(react-native|react-native-cookies|lit-element|lit|reactive-element|@lit)/)"
//   ],

// };


module.exports = {
  "preset": "ts-jest/presets/js-with-babel",
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  testEnvironment: 'jsdom',
  "transformIgnorePatterns": [
    "node_modules/(?!(lit-element|lit|reactive-element|@lit|lit-html)/)"
  ]
}
