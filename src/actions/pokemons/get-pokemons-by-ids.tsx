import {useQuery} from '@tanstack/react-query';
import {Pokemon} from '../../domain/entities/pokemon';
import {getPokemonById} from './get-pokemon';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    if (!ids.length) return [];

    const pokemonPromises: Promise<Pokemon>[] = ids.map(async id => {
      return await getPokemonById(id);
    });

    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error('Error getting pokemons by ids:', error);
    return [];
  }
};

export const useGetPokemonsByIdsQuery = (ids: number[], enabled = true) => {
  return useQuery({
    queryKey: ['pokemons', 'byIds', ids],
    queryFn: () => getPokemonsByIds(ids),
    enabled: enabled && ids.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
