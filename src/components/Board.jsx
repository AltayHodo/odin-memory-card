import { useState, useEffect } from 'react';

export default function Board() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonUrl, setPokemonUrl] = useState("");

  //fetch pokemon data, useEffect- setPokemonList with relevant data-
  // manually retrieve 12 unique pokemon?
  async function getPokemonUrl() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/clefairy/');
    response = await response.json()
    console.log(response.sprites.back_default);
    setPokemonUrl(response.sprites.back_default);
  }

  useEffect(() => {
    getPokemonUrl();
  }, [])


  //shuffle logic

  //handle card click

  return (
    <div className="card-grid">
      <img src={pokemonUrl} alt="" />
    </div>
  )
}
