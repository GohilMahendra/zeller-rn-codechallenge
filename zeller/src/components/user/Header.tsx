import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../lib/constants';

interface HeaderProps {
  testID: string;
  title?: string;
  onBackPress: () => void;
}

const Header = ({ title = '', onBackPress, testID }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={`${testID}_btnBack`}
        onPress={onBackPress}
        style={styles.iconWrapper}
      >
        <Icon name="arrow-back" size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text testID={`${testID}_txtTitle`} style={styles.txtTitle}>
          {title}
        </Text>
      </View>
      <View style={styles.iconWrapper} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  iconWrapper: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
