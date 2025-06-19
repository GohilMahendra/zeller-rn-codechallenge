import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../lib/constants';

interface CustomerEmptyListProps {
  testID: string;
}

const CustomerEmptyList = (props: CustomerEmptyListProps) => {
  const { testID } = props;
  return (
    <View testID={`${testID}_container`} style={styles.container}>
      <Text testID={`${testID}_txtEmptyText`} style={styles.txtUserNotFound}>
        No Users Found
      </Text>
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
