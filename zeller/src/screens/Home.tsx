import { useCallback } from 'react';
import {
  FlatList,
  TextInput,
  Text,
  View,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { ZellerCustomer } from '../types/models/user';
import { useZellerCustomers } from '../hooks/useZellerCustomers';
import CustomerCard from '../components/user/CustomerCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../types/navigation';
import RoleSelector from '../components/user/RoleSelector';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams, 'Home'>>();
  console.log(CustomerCard);
  const {
    customers,
    error,
    loading,
    selectedRole,
    setSelectedRole,
    refetch,
    searchTerm,
    setSearchTerm,
  } = useZellerCustomers();

  const onPressCard = useCallback((customer: ZellerCustomer) => {
    navigation.navigate('Customer', {
      user: customer,
    });
  }, []);

  const renderCustomer = (item: ZellerCustomer, index: number) => {
    return (
      <CustomerCard
        testID={`UserItem${item.id}`}
        onPress={customer => onPressCard(customer)}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          testID={`Home_inputSearch`}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholder={'Search here...'}
          style={styles.txtInput}
        />
      </View>
      <View>
        <RoleSelector
          onSelectRole={role => setSelectedRole(role)}
          selectedRole={selectedRole}
          testID={'Home_Role'}
        />
      </View>
      <View style={styles.roleTextContainer}>
        <Text style={styles.txtUserRole}>{selectedRole} Users</Text>
      </View>
      <FlatList
        testID={'Home_ListCustomers'}
        refreshControl={
          <RefreshControl
            testID={'Home_ListCustomersRefresh'}
            refreshing={loading}
            onRefresh={() => refetch()}
          />
        }
        data={customers}
        style={styles.listCustomers}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => renderCustomer(item, index)}
      />
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    height: 70,
  },
  txtInput: { fontSize: 18 },
  listCustomers: {
    flex: 1,
  },
  roleTextContainer: {
    margin: 10,
  },
  txtUserRole: {
    fontSize: 24,
    fontWeight: '500',
  },
});
