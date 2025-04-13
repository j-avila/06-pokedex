import {View, StyleSheet, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {FAB, Text} from 'react-native-paper';
import {getPokemons} from '../../actions/pokemons';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import PokeballBg from '../components/ui/PokeballBg';
import {globalTheme} from '../../config/theme/global-theme';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PokemonCard from '../pokemon/PokemonCards';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/StackNavigator';

type RootStackParamList = {
  SearchScreen: undefined;
};

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const quryClient = useQueryClient();
  const colorScheme = useColorScheme();
  const [textColor, setTextColor] = useState('black');
  const {navigate} = useNavigation<NavigationProp<RootStackParams>>();
  // NOTE: conventional way to fetch data
  /* const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5, // 60 mins
  }); */

  // NOTE: infinite scroll
  const {data, isLoading, error, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        quryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 5, // 60 mins
  });

  useEffect(() => {
    setTextColor(colorScheme === 'dark' ? 'white' : 'black');
  }, [colorScheme]);

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.pokeballPos} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index} `}
        numColumns={2}
        style={{paddingTop: top + 30}}
        ListHeaderComponent={() => (
          <Text
            variant="displayMedium"
            style={{
              color: textColor,
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            Pokedex
          </Text>
        )}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
      />
      <FAB
        icon={() => <Icon name="search" size={25} color="white" />}
        style={[styles.pokeButton, {backgroundColor: 'red'}]}
        onPress={() => navigate('SearchScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pokeballPos: {
    position: 'absolute',
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  pokeButton: {
    position: 'absolute',
    borderRadius: 100,
    padding: 5,
    bottom: 20,
    right: 10,
  },
});

export default HomeScreen;
