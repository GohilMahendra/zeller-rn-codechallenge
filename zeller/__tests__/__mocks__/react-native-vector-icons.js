import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name = 'icon', size = 24, color = 'black' }) => (
  <Text style={{ fontSize: size, color }}>{name}</Text>
);

export default Icon;
export const createIconSet = () => Icon;