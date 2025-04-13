import {StyleProp, StyleSheet, Image, ImageStyle} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContent} from '../../context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({style}: Props) => {
  const {isDark} = useContext(ThemeContent);

  const pokeBallImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  return <Image source={pokeBallImg} style={[styles.pokeball, style]} />;
};

const styles = StyleSheet.create({
  pokeball: {
    width: 300,
    height: 300,
  },
});

export default PokeballBg;
