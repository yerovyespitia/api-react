import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [offset, setOffset] = useState(0)

  const getPokemon = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    )
    const data = await res.json()
    setPokemon(data.results)
  }

  useEffect(() => {
    if (pokemon.length > 0) {
      getPokemon()
    }
  }, [offset])

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + 10)
  }

  const handlePreviousClick = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - 10)
    }
  }

  return (
    <>
      <h1>Pokemon Api</h1>
      <button onClick={getPokemon}>Traer Pokemon</button>
      <button onClick={handleNextClick}>Siguiente</button>
      <button onClick={handlePreviousClick}>Atrás</button>
      {pokemon.map((poke, index) => (
        <div key={index}>
          <p>{poke.name}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              poke.url.split('/')[6]
            }.png`}
            alt={poke.name}
          />
        </div>
      ))}
    </>
  )
}

export default App
