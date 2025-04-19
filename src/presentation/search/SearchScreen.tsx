import {FlatList, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../config/theme/global-theme';
import {Pokemon} from '../../domain/entities/pokemon';
import PokemonCard from '../pokemon/PokemonCards';
import {useQuery} from '@tanstack/react-query';
import {getPokemoNamesWithId} from '../../actions/pokemons/get-names-by-id';
import {getPokemonsByIds} from '../../actions/pokemons/get-pokemons-by-ids.tsx';
import useDebouncerValue from '../hooks/useDebouncer.tsx';
import FullScreenLoader from '../components/ui/FullScreenLoader.tsx';
import PokeballBg from '../components/ui/PokeballBg.tsx';

const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const colorscheme = useColorScheme();
  const [textColor, setColor] = useState('black');
  const [term, setTerm] = useState('');

  const debouncedValue = useDebouncerValue(term);

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemoNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    // Es un número
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(debouncedValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length === 0) return [];
    if (debouncedValue.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLocaleLowerCase()),
    );
  }, [debouncedValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // colorscheme
  useEffect(() => {
    const color = colorscheme === 'dark' ? 'white' : 'black';
    setColor(color);
  }, [colorscheme]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10, flex: 1}]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      {/* <Text>{ JSON.stringify(pokemonNameIdList, null, 2) }</Text> */}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 150}} />}
      />

      <PokeballBg style={style.pokeballBg} />
    </View>
  );
};

const style = StyleSheet.create({
  searchInput: {
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    elevation: 0,
    borderBottomColor: 'grey',
  },
  resultsContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    borderRadius: 8,
  },
  pokeballBg: {
    position: 'absolute',
    bottom: -50,
    left: -100,
    opacity: 0.5,
    width: 300,
    height: 300,
    zIndex: -1,
  },
});

export default SearchScreen;
