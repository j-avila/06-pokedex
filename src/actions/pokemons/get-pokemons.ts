import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon';
import type {
  PokeAPIPokemon,
  PokePagination,
} from '../../infrastructure/interfaces/pokeAPI.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPokemons = async (
  page: number = 0,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page * limit}&limit=${limit}`;
    const {data} = await pokeApi.get<PokePagination>(url);

    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = await Promise.all(
      pokeApiPokemons.map(async item =>
        PokemonMapper.pokeApiPokemonToEntity(item.data),
      ),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    console.error('get pokemons: ', error);
    return [];
  }
};
