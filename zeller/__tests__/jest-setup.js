import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// mocking this module temprory is react-native throwing weird error, IDK
// only happening with refreshControl where auto mocking is not working
// maybe version issue related to testing lib or react-native 
jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => {
  const { View } = require('react-native');
  const React = require('react');
  const MockRefresh = (props) => <View {...props} testID="mocked-refresh-control" />;
  return {
    __esModule: true,
    default: MockRefresh,
  };
});