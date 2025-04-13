import {FlatList, StyleSheet, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../config/theme/global-theme';
import {Pokemon} from '../../domain/entities/pokemon';
import PokemonCard from '../pokemon/PokemonCards';

const SearchScreen = () => {
  const [textColor, setColor] = useState('black');
  const colorscheme = useColorScheme();
  const {top} = useSafeAreaInsets();

  const searchHandler = (value: string) => {
    console.log('search query', value);
  };

  useEffect(() => {
    const color = colorscheme === 'dark' ? 'white' : 'black';
    console.log('☕', color, colorscheme);
    setColor(color);
  }, [colorscheme]);

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar Pokmemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={searchHandler}
        value={''}
      />

      <ActivityIndicator style={{paddingTop: 20}} />

      <FlatList
        numColumns={2}
        data={[] as Pokemon[]}
        style={{paddingTop: top + 30}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index} `}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    elevation: 0,
    borderBottomColor: 'grey',
  },
});

export default SearchScreen;
