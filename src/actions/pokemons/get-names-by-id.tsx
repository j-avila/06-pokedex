import {pokeApi} from '../../config/api/pokeApi';
import {PokePagination} from '../../infrastructure/interfaces/pokeAPI.interfaces';

export const getPokemoNamesWithId = async () => {
  const url = 'pokemon?limit=1000';
  const {data} = await pokeApi.get<PokePagination>(url);

  return data.results.map(info => ({
    name: info.name,
    id: Number(info.url.split('/')[6]),
  }));
};
