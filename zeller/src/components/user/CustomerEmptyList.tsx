import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../lib/constants';

const CustomerEmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtUserNotFound}>No Users Found</Text>
    </View>
  );
};
export default CustomerEmptyList;

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtUserNotFound: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
});
