import axios from 'axios';

export interface Pokemon {
  id: number;
  name: string;
  image?: string;
  types: string[];
  avatar: string;
  sprites: string[];
  // TODO
  // colors: string
}

export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});
