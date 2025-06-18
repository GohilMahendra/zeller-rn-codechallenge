import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ZellerCustomer } from '../../types/models/user';
import { COLORS } from '../../lib/constants';

interface CustomerCardProps {
  item: ZellerCustomer;
  onPress: (customer: ZellerCustomer) => void;
}

const CustomerCard = (props: CustomerCardProps) => {
  const { item, onPress } = props;
  const titleText = item?.name?.charAt(0);
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.txtTitle}>{titleText}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.txtName}>{item?.name}</Text>
        <Text style={styles.txtRole}>{item?.role}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  titleTextContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 5,
    height: 70,
    marginRight: 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    justifyContent: 'space-between',
  },
  txtName: {
    fontSize: 30,
  },
  txtRole: {
    fontSize: 16,
    color: 'grey',
  },
});
