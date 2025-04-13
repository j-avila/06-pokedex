import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';

interface Props {
  color?: string;
}

const FullScreenLoader = ({color}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color ? color : colors.background,
      }}>
      <ActivityIndicator size={50} />
    </View>
  );
};

export default FullScreenLoader;
