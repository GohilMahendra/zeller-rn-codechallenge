// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest-setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.|@unimodules/.|unimodules|native-base|react-native-svg)",
  ],
   transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // testMatch: ['**/__tests__/**/*.(ts|tsx)'],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   testEnvironment: 'node',
};
