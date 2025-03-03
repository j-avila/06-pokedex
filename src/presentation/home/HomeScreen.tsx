import {View, StyleSheet} from 'react-native';
import React from 'react';

import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {getPokemons} from '../../actions/pokemons';
import {useQuery} from '@tanstack/react-query';

type RootStackParamList = {
  SearchScreen: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {data, isLoading, error} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 5, // 60 mins
  });

  return (
    <View style={{color: 'white'}}>
      <Text variant="bodySmall">HomeScreen</Text>
      {isLoading ? (
        <ActivityIndicator animating={true} color="blue" />
      ) : (
        <>
          <Button
            icon="camera"
            buttonColor="green"
            onPress={() => navigation.navigate('SearchScreen')}>
            <Text style={styles.text}>Go to Search</Text>
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export default HomeScreen;
