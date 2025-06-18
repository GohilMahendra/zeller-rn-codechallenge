import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../types/navigation';
import { useEffect, useState } from 'react';
import { ZellerCustomer } from '../types/models/user';
import Header from '../components/user/Header';

const Customer = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParams, 'Customer'>>();
  // const route = useRoute<RouteProp<RootStackParams, 'Customer'>>();
  const route = {
    params: {
      user: {
        id: '1',
        name: 'Mahendra',
        email: 'mahendra@example.com',
        role: 'Admin',
      },
    },
  };

  const [user, setUser] = useState<ZellerCustomer>();

  const onBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params.user) {
      setUser(route.params.user);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        testID={'Customer_Header'}
        title={user?.name}
        onBackPress={() => onBackPress()}
      />
      {user && (
        <View style={styles.detailsContainer}>
          <Text testID={'Customer_txtName'} style={styles.txtName}>
            {user.name}
          </Text>
          <Text testID={'Customer_txtRole'} style={styles.txtRole}>
            {user.role}
          </Text>
          <Text testID={'Customer_txtEmail'} style={styles.txtRole}>
            {user.email}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtName: { fontSize: 24 },
  txtRole: { fontSize: 18 },
  txtEmail: { fontSize: 20 },
});
