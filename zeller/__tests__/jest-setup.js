import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => {
  const { View } = require('react-native');
  return (props) => <View {...props} />;
});