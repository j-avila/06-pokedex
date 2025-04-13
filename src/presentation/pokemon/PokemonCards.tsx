import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {Pokemon} from '../../domain/entities/pokemon';
import {Card, Text} from 'react-native-paper';
import {FadeInImage} from '../components/ui/FadeImage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/StackNavigator';
import {ThemeContent} from '../context/ThemeContext';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {isDark} = useContext(ThemeContent);

  const pokeballImg = isDark
    ? require('../../assets/pokeball-dark.png')
    : require('../../assets/pokeball-light.png');

  return (
    <Pressable
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          pokemonId: pokemon.id,
          color: pokemon.color,
        })
      }>
      <Card style={[styles.cardContainer, {backgroundColor: pokemon.color}]}>
        <Text style={[styles.name, {color: 'white'}]} variant="bodyLarge">
          {pokemon.name} {'\n#' + pokemon.id}
        </Text>

        {/* pokeball card background */}
        <View style={styles.pokeballContainer}>
          <Image source={pokeballImg} style={styles.pokeball} />
        </View>
        {/* Pokemon image */}
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

        {/* types */}
        <Text style={[styles.name, {marginTop: 35, color: 'white'}]}>
          {pokemon.types[0]}
        </Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});

export default PokemonCard;
