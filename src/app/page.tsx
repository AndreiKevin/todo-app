"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import TodoList from "../../components/TodoList";
import CardList from "../../components/CardList";

export default function Home() {
	const { user, signOut } = useAuth();
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();

        const detailedPokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeRes = await fetch(pokemon.url);
            return await pokeRes.json();
          })
        );
        setPokemonData(detailedPokemonData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokémon data');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []); // Empty dependency array ensures it runs once on component mount

	if (!user) return null;

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

	return (
		<div className="flex flex-col container mx-auto px-4 gap-6">
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold">Todo List</h1>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => signOut()}
					className="px-4 py-2 bg-red-500 text-white rounded"
				>
					Sign Out
				</button>
			</div>
			<TodoList />

			<div className="container mx-auto p-4">
				<h1 className="text-4xl font-bold text-center mb-8">Pokémon Cards</h1>
				<CardList pokemonData={pokemonData} />
			</div>
		</div>
	);
}
