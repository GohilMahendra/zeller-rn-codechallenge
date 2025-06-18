import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../types/navigation';
import { useEffect, useState } from 'react';
import { ZellerCustomer } from '../types/models/user';

const Customer = () => {
  const route = useRoute<RouteProp<RootStackParams, 'Customer'>>();
  const [user, setUser] = useState<ZellerCustomer>();

  useEffect(() => {
    if (route.params.user) {
      setUser(route.params.user);
    }
  }, [route.params.user]);

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <Text style={styles.txtName}>{user.name}</Text>
          <Text style={styles.txtRole}>{user.role}</Text>
          <Text style={styles.txtRole}>{user.email}</Text>
        </View>
      )}
    </View>
  );
};
export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: { fontSize: 24 },
  txtRole: { fontSize: 18 },
  txtEmail: { fontSize: 20 },
});
