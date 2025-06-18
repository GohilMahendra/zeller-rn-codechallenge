import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import { RootStackParams } from '../types/navigation';
import Customer from '../screens/Customer';

const RootStack = createStackNavigator<RootStackParams>();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          component={Home}
          options={{ headerShown: false }}
          name={'Home'}
        />
        <RootStack.Screen
          component={Customer}
          options={{ headerShown: false }}
          name={'Customer'}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default RootStackNavigation;
