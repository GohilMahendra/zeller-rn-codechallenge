import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';


jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => {
  const { View } = require('react-native');
  const React = require('react');
  const MockRefresh = (props) => <View {...props} testID="mocked-refresh-control" />;
  return {
    __esModule: true,
    default: MockRefresh,
  };
});