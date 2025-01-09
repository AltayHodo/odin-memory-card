import { useState, useEffect } from 'react';
import Card from './Card';
import Modal from './Modal';

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
  ].map((name) => ({
    id: crypto.randomUUID(),
    name,
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
            name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
            imageUrl: data.sprites.front_default,
          };
        })
      );
      const shuffledResults = shuffleArray(results);
      setPokemonData(shuffledResults);
    } catch (error) {
      alert('Error fetching Pokemon: ', error);
    }
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  const [clickedPokemonIds, setClickedPokemonIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [modalMessage, setModalMessage] = useState('');

  function handleClick(pokemonId) {
    if (clickedPokemonIds.includes(pokemonId)) {
      setModalMessage('Game over!')
    } else {
      setClickedPokemonIds((prev) => [...prev, pokemonId]);
      setCurrentScore(currentScore + 1);
      shufflePokemonData();
      if (currentScore + 1 == 12) {
        setModalMessage('You Won!')
      }
    }
  }

  function resetGame() {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentScore(0);
    setClickedPokemonIds([]);
    setModalMessage('');
    shufflePokemonData();
  }

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function shufflePokemonData() {
    const shuffled = shuffleArray(pokemonData);
    setPokemonData(shuffled);
  }

  return (
    <>
    {modalMessage && (
      <Modal message={modalMessage} onReset={resetGame} />
    )}
      <div className="score-container">
        <span>
          Current Score: {currentScore} Best Score: {bestScore}
        </span>
      </div>
      <div className="card-grid">
        {pokemonData.map((pokemon) => (
          <Card {...pokemon} key={pokemon.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
}
