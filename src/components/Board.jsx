import { useState, useEffect } from 'react';
import Card from './Card';

export default function Board() {
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonList = [
    'mewtwo',
    'pikachu',
    'charizard',
    'rayquaza',
    'gengar',
    'blaziken',
    'greninja',
    'garchomp',
    'jigglypuff',
    'venusaur',
    'dragonite',
    'flygon',
  ].map(name => ({
    id: crypto.randomUUID(),
    name
  }));

  async function getPokemonData() {
    try {
      const results = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
          );
          const data = await response.json();
          return {
            ...pokemon,
            imageUrl: data.sprites.front_default,
          };
        })
      );
      console.log(results);
      setPokemonData(results);
    } catch (error) {
      alert('Error fetching Pokemon: ', error);
    }
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  //shuffle logic

  //handle card click

  return (
    <div className="card-grid">
      {pokemonData.map(pokemon => (
        <Card {...pokemon} key={pokemon.id} isClicked={false} />
      ))}
    </div>
  )
}
