import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../actions/pokemons';
import FullScreenLoader from '../components/ui/FullScreenLoader';
import {FadeInImage} from '../components/ui/FadeImage';
import {Chip, Text} from 'react-native-paper';
import {Formatter} from '../../config/helpers/formatter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContent} from '../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {pokemonId, color} = route.params;
  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContent);

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pokeballImg = isDark
    ? require('../../assets/pokeball-dark.png')
    : require('../../assets/pokeball-light.png');

  if (!pokemon || isLoading) {
    return <FullScreenLoader color={color} />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites - Replaced FlatList with horizontal ScrollView */}
      <View style={{marginTop: 20, height: 100}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          {pokemon.sprites.map((spriteUrl, index) => (
            <FadeInImage
              key={`sprite-${index}-${spriteUrl}`}
              uri={spriteUrl}
              style={{width: 100, height: 100, marginHorizontal: 5}}
            />
          ))}
        </ScrollView>
      </View>

      {/* Stats - Replaced FlatList with View and manual layout */}
      <Text style={styles.subTitle}>Stats</Text>
      <View style={styles.statsGrid}>
        {pokemon.stats.map(stat => (
          <View key={stat.name} style={styles.statItem}>
            <Text variant="bodyMedium" style={{textAlign: 'center'}}>
              {Formatter.capitalize(stat.name)}
            </Text>
            <Text>{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <View style={styles.statsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 8}}>
          {pokemon.abilities.map((ability, index) => (
            <Chip
              key={`ability-${index}-${ability}`}
              mode="outlined"
              style={{margin: 5}}
              selectedColor="white">
              {Formatter.capitalize(ability)}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <View style={styles.statsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 8}}>
          {pokemon.moves.map((move, index) => (
            <Chip
              key={`move-${index}-${move.name}`}
              mode="outlined"
              style={{margin: 5}}
              selectedColor="white">
              {Formatter.capitalize(move.name)}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Add some bottom space for better scrolling experience */}
      <View style={{height: 20}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  statItem: {
    margin: 5,
    width: '45%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(247, 247, 247, 0.57)',
    borderRadius: 10,
  },
});

export default PokemonScreen;
