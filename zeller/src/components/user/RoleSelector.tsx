import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Role } from '../../types/models/user';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../lib/constants';

interface RoleSelectorProps {
  testID: string;
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
}

const ROLES: Role[] = ['Admin', 'Manager'];

const RoleSelector = (props: RoleSelectorProps) => {
  const { testID, onSelectRole, selectedRole } = props;
  return (
    <View style={styles.parent}>
      <View style={styles.headerContainer}>
        <Text style={styles.txtHeader}>User Types</Text>
      </View>
      {ROLES.map((role, index) => (
        <TouchableOpacity
          testID={`${testID}${role}_btnSelectRole`}
          onPress={() => onSelectRole(role)}
          style={[
            styles.container,
            {
              backgroundColor:
                selectedRole == role ? COLORS.lightBackground : 'transparent',
            },
          ]}
        >
          <Icon
            name={
              selectedRole == role
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={24}
            color={selectedRole == role ? COLORS.primary : '#ccc'}
          />
          <Text testID={`${testID}_txtSelectdRole`} style={styles.txtRole}>
            {role}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RoleSelector;

const styles = StyleSheet.create({
  parent: {
    borderBottomWidth: 1,
  },
  headerContainer: {
    padding: 10,
  },
  txtHeader: {
    fontSize: 24,
    fontWeight: '500',
  },
  container: {
    flexDirection: 'row',
    height: 70,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  txtRole: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
