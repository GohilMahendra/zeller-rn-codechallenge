/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStackNavigation from './src/navigation/RootStackNavigation';
import { ApolloProvider } from '@apollo/client';
import client from './src/graphql/client';
function App() {
  return (
    <GestureHandlerRootView>
      <ApolloProvider client={client}>
        <RootStackNavigation />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

export default App;
